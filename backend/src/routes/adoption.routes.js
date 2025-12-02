import { Router } from 'express';
import { createAdoptionRequest, listAdoptionsAdmin, updateAdoptionStatus } from '../controllers/adoptionController.js';
import { authRequired, adminRequired } from '../middleware/auth.js';

const router = Router();
router.post('/', authRequired, createAdoptionRequest);
router.get('/', authRequired, adminRequired, listAdoptionsAdmin);
router.put('/:id', authRequired, adminRequired, updateAdoptionStatus);
export default router;
