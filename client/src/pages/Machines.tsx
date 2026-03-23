import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { Loader2, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  tid: string;
  name: string;
}

interface Machine {
  id: number;
  title: string;
  model: string;
  brand: string;
  year: string;
  price: string;
  currency: string;
  url: string;
  pictures: { url: string; date: string }[];
  category: Category[];
  description: string;
}

interface CategoryNode {
  id: string;
  name: string;
  children: CategoryNode[];
  count: number;
}

function formatPrice(price: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return price;
  return num.toLocaleString('da-DK');
}

function buildCategoryTree(machines: Machine[]): CategoryNode[] {
  const rootMap = new Map<string, CategoryNode>();
  
  machines.forEach(machine => {
    if (!machine.category || machine.category.length === 0) return;
    
    let currentLevel = rootMap;
    let parentNode: CategoryNode | null = null;
    
    machine.category.forEach((cat, index) => {
      if (!currentLevel.has(cat.id)) {
        const newNode: CategoryNode = {
          id: cat.id,
          name: cat.name,
          children: [],
          count: 0
        };
        currentLevel.set(cat.id, newNode);
        if (parentNode) {
          parentNode.children.push(newNode);
        }
      }
      
      const node = currentLevel.get(cat.id)!;
      node.count++;
      
      const childMap = new Map<string, CategoryNode>();
      node.children.forEach(child => childMap.set(child.id, child));
      
      parentNode = node;
      currentLevel = childMap;
    });
  });
  
  return Array.from(rootMap.values()).sort((a, b) => b.count - a.count);
}

function CategoryTreeItem({ 
  node, 
  level, 
  selectedCategory, 
  expandedCategories, 
  onSelect, 
  onToggle 
}: { 
  node: CategoryNode;
  level: number;
  selectedCategory: string | null;
  expandedCategories: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedCategories.has(node.id);
  const isSelected = selectedCategory === node.id;
  
  return (
    <div style={{ marginLeft: level > 0 ? '12px' : '0' }}>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
            className="p-1 hover:bg-slate-100 rounded flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        {!hasChildren && level > 0 && <div className="w-6" />}
        <button
          onClick={() => onSelect(node.id)}
          className={`flex-1 text-left px-3 py-2 rounded text-sm flex items-center justify-between ${
            isSelected 
              ? 'bg-primary text-white' 
              : 'hover:bg-slate-50'
          }`}
          data-testid={`filter-category-${node.id}`}
        >
          <span className={level === 0 ? 'font-medium' : ''}>{node.name}</span>
          <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
            ({node.count})
          </span>
        </button>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="border-l-2 border-slate-100 ml-2 mt-1">
          {node.children.map(child => (
            <CategoryTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              expandedCategories={expandedCategories}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  useEffect(() => {
    document.title = 'Maskiner på lager - CR Maskiner | Nye & brugte entreprenørmaskiner';
  }, []);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const response = await fetch('/api/machines');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMachines(data);
        }
      } catch (error) {
        console.error('Error fetching machines:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMachines();
  }, []);

  const categoryTree = useMemo(() => buildCategoryTree(machines), [machines]);

  const brands = useMemo(() => {
    const brandCounts = new Map<string, number>();
    machines.forEach(machine => {
      if (machine.brand) {
        brandCounts.set(machine.brand, (brandCounts.get(machine.brand) || 0) + 1);
      }
    });
    return Array.from(brandCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([brand, count]) => ({ brand, count }));
  }, [machines]);

  const filteredMachines = useMemo(() => {
    return machines.filter(machine => {
      if (selectedCategory && !machine.category?.some(cat => cat.id === selectedCategory)) {
        return false;
      }
      if (selectedBrand && machine.brand !== selectedBrand) {
        return false;
      }
      return true;
    });
  }, [machines, selectedCategory, selectedBrand]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const toggleCategoryExpand = (catId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(catId)) {
      newExpanded.delete(catId);
    } else {
      newExpanded.add(catId);
    }
    setExpandedCategories(newExpanded);
  };

  const selectCategory = (catId: string) => {
    setSelectedCategory(selectedCategory === catId ? null : catId);
    setShowCategoryDropdown(false);
  };

  const selectBrand = (brand: string) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
    setShowBrandDropdown(false);
  };

  const hasActiveFilters = selectedCategory || selectedBrand;

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return null;
    
    function findInTree(nodes: CategoryNode[]): string | null {
      for (const node of nodes) {
        if (node.id === selectedCategory) return node.name;
        const found = findInTree(node.children);
        if (found) return found;
      }
      return null;
    }
    
    return findInTree(categoryTree);
  }, [selectedCategory, categoryTree]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero with background image */}
        <section className="relative h-[70vh] min-h-[450px] overflow-hidden">
          <img
            src="/hero-drone.jpg"
            alt="CR Maskiner maskinplads"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#1a2332]/70 to-[#1a2332]/40" />

          <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-3">
              Altid 120+ på lager
            </p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight"
              data-testid="text-page-title"
            >
              Brugte maskiner
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              Til omgående levering. Alle priser er ekskl. moms — forbehold for mellemsalg.
            </p>
          </div>
        </section>

        <div className="sticky top-[108px] z-40 bg-white border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowBrandDropdown(false);
                  }}
                  data-testid="button-category-filter"
                >
                  <span className="font-medium">Kategori</span>
                  {selectedCategoryName && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">
                      {selectedCategoryName}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-border z-50 max-h-96 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => selectCategory('')}
                        className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
                          !selectedCategory ? 'bg-slate-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        Alle kategorier
                      </button>
                      
                      {categoryTree.map(root => (
                        <CategoryTreeItem
                          key={root.id}
                          node={root}
                          level={0}
                          selectedCategory={selectedCategory}
                          expandedCategories={expandedCategories}
                          onSelect={selectCategory}
                          onToggle={toggleCategoryExpand}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setShowBrandDropdown(!showBrandDropdown);
                    setShowCategoryDropdown(false);
                  }}
                  data-testid="button-brand-filter"
                >
                  <span className="font-medium">Mærke</span>
                  {selectedBrand && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">
                      {selectedBrand}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {showBrandDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => selectBrand('')}
                        className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
                          !selectedBrand ? 'bg-slate-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        Alle mærker
                      </button>
                      
                      {brands.map(({ brand, count }) => (
                        <button
                          key={brand}
                          onClick={() => selectBrand(brand)}
                          className={`w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between ${
                            selectedBrand === brand 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-slate-50'
                          }`}
                          data-testid={`filter-brand-${brand}`}
                        >
                          <span>{brand}</span>
                          <span className={`text-xs ${selectedBrand === brand ? 'text-white/80' : 'text-muted-foreground'}`}>
                            ({count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary"
                  data-testid="button-clear-filters"
                >
                  <X className="w-4 h-4 mr-1" />
                  Ryd filtre
                </Button>
              )}

              <div className="ml-auto text-sm text-muted-foreground">
                Viser {filteredMachines.length} af {machines.length} maskiner
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMachines.map((machine) => (
                  <Card
                    key={machine.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white"
                    data-testid={`card-machine-${machine.id}`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                      {machine.pictures?.[0]?.url ? (
                        <img
                          src={machine.pictures[0].url}
                          alt={machine.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Ingen billede
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur text-xs font-medium px-2 py-1 rounded text-foreground">
                          {machine.year}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                          {machine.brand}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 leading-snug" data-testid={`text-machine-title-${machine.id}`}>
                        {machine.title}
                      </h3>
                      <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="font-bold text-lg text-foreground" data-testid={`text-machine-price-${machine.id}`}>
                            {formatPrice(machine.price)} kr
                          </span>
                          <span className="text-xs text-muted-foreground block">ekskl. moms</span>
                        </div>
                        <Link
                          href={`/maskine/${machine.id}`}
                          className="text-sm font-semibold text-foreground hover:underline"
                          data-testid={`link-machine-${machine.id}`}
                        >
                          Læs mere
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMachines.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p>Ingen maskiner matcher dine filtre.</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-2 text-primary hover:underline"
                  >
                    Ryd filtre
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}