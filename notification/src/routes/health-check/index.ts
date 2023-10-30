import express from 'express';
import { getHealthCheckStatuses } from '../../controllers/health-check';

const router = express.Router();

router.get('/', getHealthCheckStatuses);

export default router;
