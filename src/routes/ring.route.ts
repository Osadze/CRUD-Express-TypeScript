import express from 'express';
import RingValidator from '../validators/validator';
import Middleware from '../middlewares/handleValidation';
import RingController from '../controllers/ring';

const router = express.Router();

router.post(
  '/rings',
  RingValidator.checkCreateAndUpdateRing(),
  Middleware.handleValidationError,
  RingController.create
);

router.get(
  '/rings',
  RingValidator.checkGetRings(),
  Middleware.handleValidationError,
  RingController.getAll
);
router.get(
  '/rings/:id',
  RingValidator.checkIdParam(),
  Middleware.handleValidationError,
  RingController.getById
);

router.patch(
  '/rings/:id',
  RingValidator.checkIdParam(),
  RingValidator.checkCreateAndUpdateRing(),
  Middleware.handleValidationError,
  RingController.update
);
router.delete(
  '/rings/:id',
  RingValidator.checkIdParam(),
  Middleware.handleValidationError,
  RingController.delete
);

export default router;
