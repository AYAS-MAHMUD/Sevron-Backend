import { Router } from "express";
import { adminController } from "./admin.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";




const router = Router() ;



router.get("/all-admins",authCheck(Role.ADMIN, Role.SUPER_ADMIN),adminController.getAllAdmins)


router.get("/:id",adminController.getAdminById)

router.patch("/:id",authCheck(Role.SUPER_ADMIN),adminController.updateAdminById)

router.delete("/:id",authCheck(Role.SUPER_ADMIN),adminController.softDeleteAdminById)
  
export const AdminRoute = router ; 
