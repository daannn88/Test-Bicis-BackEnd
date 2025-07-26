import express from 'express';

import { createRent, getAllRents, getRentById, removeRentById, returnBikeRent, updateRentById } from '../controllers/rent.controller.mjs';

const router = express.Router();

router.post('/api/rents', createRent),
router.post('/api/rents/:rentId', returnBikeRent)
router.get('/api/rents', getAllRents)
router.get('/api/rents/:id', getRentById)
router.delete('/api/rents/:id', removeRentById)
router.patch('/api/rents/:id', updateRentById)

export default router;