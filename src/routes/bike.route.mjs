import express from 'express';

import { createBike, getAllBikes, getBikeById, getOnlyBikesAvalaivable, removeBikeById, updateBikeById } from '../controllers/bikes.controller.mjs';

const router = express.Router();

router.post('/api/bikes', createBike),
router.get('/api/bikes', getAllBikes)
router.get('/api/bikes/:stateBike', getOnlyBikesAvalaivable),
router.get('/api/bikes/:id', getBikeById)
router.delete('/api/bikes/:id', removeBikeById)
router.patch('/api/bikes/:id', updateBikeById)

export default router;