import { Request, Response } from 'express';
import AdminService from '../services/admin.service';
class AdminController {
    private static instance: AdminController;
    private constructor() {}

    public static getInstance(): AdminController {
        if (!AdminController.instance) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    }

    async addItem(req: Request, res: Response) {
        try {
            const { name, price, stock } = req.body;
            const newItem = await AdminService.addGroceryItem(name, price, stock);
            res.status(201).json(newItem);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Failed to add item' });
        }
    }

    async listItems(_: Request, res: Response) {
        try {
            const items = await AdminService.getGroceryItems();
            res.status(200).json(items);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Failed to fetch items' });
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated: any = await AdminService.updateGroceryItem(id, req.body);
            if (updated[0] === 0) {
                return res.status(404).json({ message: 'Item not found or no changes made' });
            }
            res.status(200).send(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Failed to update item' });
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted: any = await AdminService.deleteGroceryItem(id);
            if (deleted === 0) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Failed to delete item' });
        }
    }
}

export default AdminController.getInstance();
