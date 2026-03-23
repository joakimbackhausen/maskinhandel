import * as cheerio from "cheerio";

const FEED_BASE = "https://altimaskiner.dk/feed/1066/html";

const CATEGORY_NAMES: Record<string, string> = {
  entreprenoermaskiner: "Entreprenørmaskiner",
  gravemaskiner: "Gravemaskiner",
  minigravere: "Minigravere",
  materialehandtering: "Materialehåndtering",
  minilaessere: "Minilæssere",
  gummihjulslaessere: "Gummihjulslæssere",
  teleskoplaessere: "Teleskoplæssere",
  dumpere: "Dumpere",
  transport: "Transport",
};

interface Machine {
  id: number;
  ad_id: number;
  sku: number;
  company_id: string;
  title: string;
  model: string;
  brand: string;
  year: string;
  price: string;
  currency: string;
  url: string;
  pictures: { url: string; date: string }[];
  category: { id: string; tid: string; name: string }[];
  description: string;
  contact: string;
  address: string;
  extra_parameters: Record<string, { name: string; value: string }>;
}

interface ListItem {
  adId: number;
  title: string;
  price: string;
  thumbnail: string;
  categorySlugs: string[];
  url: string;
}

// In-memory cache
let cachedMachines: Machine[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return res.text();
}

function parseListPage(html: string): ListItem[] {
  const $ = cheerio.load(html);
  const items: ListItem[] = [];

  $("li.grid-item").each((_, el) => {
    const $el = $(el);
    const link = $el.find("a").first();
    const href = link.attr("href") || "";
    const dataHref = link.attr("data-href") || "";

    const adIdMatch = href.match(/ad_id=(\d+)/);
    if (!adIdMatch) return;

    const adId = parseInt(adIdMatch[1], 10);
    const title = $el.find(".grid-title").text().trim();
    const priceText = $el.find(".price").text().trim();
    const price = priceText.replace(/[^\d]/g, "");
    const thumbnail = $el.find("img").attr("src") || "";

    // Category slugs from CSS classes (exclude "grid-item")
    const classes = ($el.attr("class") || "").split(/\s+/).filter(
      (c) => c !== "grid-item" && c !== ""
    );

    items.push({
      adId,
      title,
      price,
      thumbnail,
      categorySlugs: classes,
      url: dataHref || href,
    });
  });

  return items;
}

function parsePageCount(html: string): number {
  const matches = html.match(/page=(\d+)/g);
  if (!matches) return 1;
  const pages = matches.map((m) => parseInt(m.replace("page=", ""), 10));
  return Math.max(...pages, 1);
}

function parseDetailPage(html: string, adId: number): Partial<Machine> {
  const $ = cheerio.load(html);

  // Pictures
  const pictures: { url: string; date: string }[] = [];
  $("a.my-image-links").each((_, el) => {
    const href = $(el).attr("href");
    if (href) {
      pictures.push({ url: href, date: "" });
    }
  });

  // Description
  const descriptionDiv = $(".fieldset").filter((_, el) => {
    return $(el).find("h3.title").text().trim() === "Beskrivelse";
  });
  const description = descriptionDiv.find("div").first().html()?.trim() || "";

  // Facts from data-list
  const facts: Record<string, string> = {};
  $(".data-list li").each((_, el) => {
    const key = $(el).find("strong").text().trim();
    const value = $(el).find("span").text().trim();
    if (key && value) {
      facts[key] = value;
    }
  });

  const year = facts["Årgang"] || "";
  const brand = facts["Fabrikat"] || "";
  const model = facts["Model"] || "";
  const contact = facts["Kontaktperson"] || "";
  const address = facts["Adresse"] || "";

  return {
    year,
    brand,
    model,
    description,
    pictures,
    contact,
    address,
  };
}

function buildCategories(slugs: string[]): { id: string; tid: string; name: string }[] {
  return slugs.map((slug) => ({
    id: slug,
    tid: slug,
    name: CATEGORY_NAMES[slug] || slug,
  }));
}

async function fetchAllListItems(): Promise<ListItem[]> {
  const firstPageHtml = await fetchPage(FEED_BASE);
  const firstPageItems = parseListPage(firstPageHtml);
  const pageCount = parsePageCount(firstPageHtml);

  if (pageCount <= 1) return firstPageItems;

  const otherPages = Array.from({ length: pageCount - 1 }, (_, i) => i + 2);
  const otherResults = await Promise.all(
    otherPages.map(async (page) => {
      const html = await fetchPage(`${FEED_BASE}?page=${page}`);
      return parseListPage(html);
    })
  );

  return [...firstPageItems, ...otherResults.flat()];
}

export async function fetchAllMachines(): Promise<Machine[]> {
  // Return cache if fresh
  if (cachedMachines && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedMachines;
  }

  const listItems = await fetchAllListItems();

  // Fetch all detail pages in parallel (batched to avoid overwhelming the server)
  const BATCH_SIZE = 10;
  const machines: Machine[] = [];

  for (let i = 0; i < listItems.length; i += BATCH_SIZE) {
    const batch = listItems.slice(i, i + BATCH_SIZE);
    const details = await Promise.all(
      batch.map(async (item) => {
        try {
          const html = await fetchPage(`${FEED_BASE}?ad_id=${item.adId}`);
          return parseDetailPage(html, item.adId);
        } catch {
          return {} as Partial<Machine>;
        }
      })
    );

    batch.forEach((item, idx) => {
      const detail = details[idx];
      const pics = detail.pictures && detail.pictures.length > 0
        ? detail.pictures
        : item.thumbnail ? [{ url: item.thumbnail, date: "" }] : [];

      machines.push({
        id: item.adId,
        ad_id: item.adId,
        sku: item.adId,
        company_id: "1066",
        title: item.title,
        model: detail.model || item.title,
        brand: detail.brand || "",
        year: detail.year || "",
        price: item.price,
        currency: "DKK",
        url: item.url,
        pictures: pics,
        category: buildCategories(item.categorySlugs),
        description: detail.description || "",
        contact: detail.contact || "",
        address: detail.address || "",
        extra_parameters: {},
      });
    });
  }

  cachedMachines = machines;
  cacheTimestamp = Date.now();
  return machines;
}

export async function fetchMachineById(id: number): Promise<Machine | undefined> {
  const machines = await fetchAllMachines();
  return machines.find((m) => m.id === id);
}
