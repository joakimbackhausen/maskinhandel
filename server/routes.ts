import type { Express } from "express";
import { createServer, type Server } from "http";
import { fetchAllMachines, fetchMachineById } from "./scraper";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/api/machines', async (req, res) => {
    try {
      const machines = await fetchAllMachines();
      res.json(machines);
    } catch (error) {
      console.error('Error fetching machines:', error);
      res.status(500).json({ error: 'Failed to fetch machines' });
    }
  });

  app.get('/api/machines/:id', async (req, res) => {
    try {
      const machine = await fetchMachineById(parseInt(req.params.id, 10));
      if (!machine) {
        res.status(404).json({ error: 'Machine not found' });
        return;
      }
      res.json(machine);
    } catch (error) {
      console.error('Error fetching machine:', error);
      res.status(500).json({ error: 'Failed to fetch machine' });
    }
  });

  return httpServer;
}
