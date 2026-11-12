import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";
import { DoctorScheduleController } from "./doctorSchedule.controller";

const router = Router();

router.post(
  "/create-my-doctor-schedule",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.createMyDoctorSchedule,
);

router.get(
  "/my-doctor-schedules",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.getMyDoctorSchedules,
);
router.get(
  "/",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getAllDoctorSchedules,
);
router.get(
  "/:doctorId/schedule/:scheduleId",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getDoctorScheduleById,
);
router.patch(
  "/update-my-doctor-schedule",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.updateMyDoctorSchedule,
);
router.delete(
  "/delete-my-doctor-schedule/:id",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.deleteMyDoctorSchedule,
);

export const DoctorScheduleRoutes = router;
