import express from 'express';
import RingValidator from '../validators/validator';
import Middleware from '../middlewares/handleValidation';
import RingController from '../controllers/ring';

const router = express.Router();

router.post(
  '/create',
  RingValidator.checkCreateAndUpdateRing(),
  Middleware.handleValidationError,
  RingController.create
);

router.get(
  '/read',
  RingValidator.checkGetRings(),
  Middleware.handleValidationError,
  RingController.getAll
);
router.get(
  '/read/:id',
  RingValidator.checkIdParam(),
  Middleware.handleValidationError,
  RingController.getById
);

router.patch(
  '/update/:id',
  RingValidator.checkIdParam(),
  RingValidator.checkCreateAndUpdateRing(),
  Middleware.handleValidationError,
  RingController.update
);
router.delete(
  '/delete/:id',
  RingValidator.checkIdParam(),
  Middleware.handleValidationError,
  RingController.delete
);

export default router;
