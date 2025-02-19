import { Router } from 'express';
import { userRouter } from './user-routes.js';
import groceryRoutes from "./grocery-routes";

const router = Router();

router.use('/users', userRouter);
router.use("/grocery", groceryRoutes);

export default router;
