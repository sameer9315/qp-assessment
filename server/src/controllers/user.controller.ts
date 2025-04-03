import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
    private static instance: UserController;
    private constructor() {}

    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    async createOrder(req: Request, res: Response) {
        try {
            const { items } = req.body;
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: 'Invalid order data. Items must be a non-empty array.' });
            }
            const order = await UserService.createOrder(items);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Failed to create order' });
        }
    }
}

export default UserController.getInstance();