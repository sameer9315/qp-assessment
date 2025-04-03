import GroceryItem from '../../db/models/groceryItem';

class AdminService {
    private static instance: AdminService;
    private constructor() {}

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }
        return AdminService.instance;
    }

    async addGroceryItem(name: string, price: number, stock: number) {
        try {
            if (!name || price < 0 || stock < 0) {
                throw new Error('Invalid item data');
            }
            const item = await GroceryItem.create({ name, price, stock });
            return { success: true, item };
        } catch (error: any) {
            console.error('Error adding grocery item:', error);
            return { success: false, error: error.message };
        }
    }

    async getGroceryItems() {
        try {
            const items = await GroceryItem.findAll();
            return { success: true, items };
        } catch (error: any) {
            console.error('Error fetching grocery items:', error);
            return { success: false, error: error.message };
        }
    }

    async updateGroceryItem(id: number, data: Partial<{ name: string; price: number; stock: number }>) {
        try {
            const updated = await GroceryItem.update(data, { where: { id } });
            if (updated[0] === 0) {
                throw new Error('Item not found or no changes applied');
            }
            return { success: true, message: 'Item updated successfully' };
        } catch (error: any) {
            console.error('Error updating grocery item:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteGroceryItem(id: number) {
        try {
            const deleted = await GroceryItem.destroy({ where: { id } });
            if (deleted === 0) {
                throw new Error('Item not found');
            }
            return { success: true, message: 'Item deleted successfully' };
        } catch (error: any) {
            console.error('Error deleting grocery item:', error);
            return { success: false, error: error.message };
        }
    }
}

export default AdminService.getInstance();
