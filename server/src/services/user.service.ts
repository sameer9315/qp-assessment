import Order from '../../db/models/orders';
import GroceryItem from '../../db/models/groceryItem';

class UserService {
    private static instance: UserService;
    private constructor() {}

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async createOrder(items: { id: number; quantity: number }[]) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Invalid order data. Items must be a non-empty array.');
        }

        let totalPrice = 0;

        try {
            const itemDetails = await Promise.all(items.map(async ({ id, quantity }) => {
                const item: GroceryItem | null = await GroceryItem.findByPk(id);
                if (!item) throw new Error(`Item not found: ${id}`);
                if (item.stock < quantity) throw new Error(`Insufficient stock for item: ${id}`);

                totalPrice += item.price * quantity;
                await item.update({ stock: item.stock - quantity });

                return { id: item.id, name: item.name, price: item.price, quantity };
            }));

            const order = await Order.create({ items: JSON.stringify(itemDetails), totalPrice, status: 'completed' });
            return order;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error processing order');
        }
    }
}

export default UserService.getInstance();
