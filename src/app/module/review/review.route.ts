import express from 'express';
import { ReviewController } from './review.controller';
import { authCheck } from '../../middleware/authCheck';
import { Role } from '../../../generated/prisma/browser';
import validateRequest from '../../middleware/validateRequest';
import { ReviewValidation } from './review.validation';


const router = express.Router();

router.get('/', ReviewController.getAllReviews);

router.post(
    '/',
    authCheck(Role.PATIENT),
    validateRequest(ReviewValidation.createReviewZodSchema),
    ReviewController.giveReview
);

router.get('/my-reviews', authCheck(Role.PATIENT, Role.DOCTOR), ReviewController.myReviews);

router.patch('/:id', authCheck(Role.PATIENT), validateRequest(ReviewValidation.updateReviewZodSchema), ReviewController.updateReview);

router.delete('/:id', authCheck(Role.PATIENT), ReviewController.deleteReview);




export const ReviewRoutes = router;