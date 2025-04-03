import { Router } from 'express';
import userController from '../controllers/user.controller';
import adminController from '../controllers/admin.controller';
const router = Router();


router.post('/createOrder', userController.createOrder);
router.get('/getList', adminController.listItems);
export default router;