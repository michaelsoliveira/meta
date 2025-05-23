import { Request, Response } from "express";
import clienteService from "../services/ClienteService";

class ClienteController {
  async findAll(req: Request, res: Response) {
    try {
      const clientes = await clienteService.findAll();
      return res.json(clientes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cliente = await clienteService.findById(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      return res.json(cliente);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const cliente = await clienteService.create(req.body);
      return res.status(201).json(cliente);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cliente = await clienteService.update(id, req.body);
      return res.json(cliente);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await clienteService.delete(id);
    if (result.error) {
      return res.status(400).json(result);
    }
    return res.json(result);
  }
}

export default new ClienteController();
