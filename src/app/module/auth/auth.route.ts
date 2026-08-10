import { Router } from "express";
import { authController } from "./auth.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";


const router = Router();


router.post("/register",authController.registerPatient);
router.post("/login",authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me",authCheck(...Object.values(Role)),authController.getMe)

router.post("/refreshToken", authController.getNewToken)
router.post("/changePassword",authCheck(...Object.values(Role)),authController.changePassword);

// Need Nodemailer configuration for sending email verification otp
router.post("/verify-email", authController.verifyEmailOTP);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


// router.post("/send-any-email", authController.sendanyEmail)


// For google login
router.get("/login/google",authController.googleLogin);
router.get("/google/success",authController.googleLoginSuccess)
router.get("/oauth/error", authController.handleOAuthError);

 
export const authRouter = router ;
