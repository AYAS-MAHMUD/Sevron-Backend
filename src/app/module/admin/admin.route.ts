import { Router } from "express";
import { adminController } from "./admin.controller";




const router = Router() ;



router.get("/all-admins",adminController.getAllAdmins)


router.get("/:id",adminController.getAdminById)

router.patch("/:id",adminController.updateAdminById)
router.delete("/:id",adminController.softDeleteAdminById)
  
export const AdminRoute = router ; 
