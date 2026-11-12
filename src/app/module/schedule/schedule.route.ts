import { Router } from "express";
import { scheduleController } from "./schedule.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";
import validationRequest from "../../middleware/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const router = Router();

router.post(
    "/",
    authCheck(Role.ADMIN, Role.SUPER_ADMIN),
    validationRequest(ScheduleValidation.createScheduleZodSchema),
    scheduleController.createSchedules,
);

router.get(
  "/",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  scheduleController.getAllSchedules,
);

router.get(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  scheduleController.getSchedulesById,
);


router.patch(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  validationRequest(ScheduleValidation.updateScheduleZodSchema),
  scheduleController.updateSchedules,
);

router.delete(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  scheduleController.deleteSchedules,
);

export const scheduleRoute = router;
