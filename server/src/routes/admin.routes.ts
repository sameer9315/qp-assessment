import { Router } from 'express';
import userController from '../controllers/user.controller';
import adminController from '../controllers/admin.controller';
const router = Router();


router.post('/addItem', adminController.addItem);
router.get('/getList', adminController.listItems);
router.delete('/deleteItem/:id', adminController.deleteItem);
router.put('/updateItem/:id', adminController.updateItem);
export default router;