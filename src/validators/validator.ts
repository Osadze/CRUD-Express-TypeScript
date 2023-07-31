import { body, param, query } from 'express-validator';

class RingValidator {
  checkCreateAndUpdateRing() {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('The value should be UUID v4'),
      body('title').notEmpty().withMessage('Title required').isString(),
      body('description')
        .notEmpty()
        .withMessage('Description required')
        .isString(),
      body('image_Url').notEmpty().withMessage('Image_Url required').isString(),
    ];
  }
  checkGetRings() {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Limit Value Should be Number bettwen 1-10'),
      query('offset')
        .optional()
        .isInt()
        .withMessage('Offset Value Should be Number'),
    ];
  }
  checkIdParam() {
    return [param('id').isUUID(4).withMessage('The value should be UUID v4')];
  }
}

export default new RingValidator();
