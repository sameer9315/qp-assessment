import { Router } from 'express';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';

const router = Router();

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
export default router