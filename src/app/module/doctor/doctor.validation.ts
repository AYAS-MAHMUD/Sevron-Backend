
import { z } from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateDoctorValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),

    profilePhoto: z.string().url().optional(),

    contactNumber: z.string().optional(),

    address: z.string().optional(),

    registrationNumber: z.string().optional(),

    experience: z
      .number()
      .int()
      .min(0)
      .optional(),

    gender: z.enum([Gender.MALE,Gender.FEMALE]).optional(),

    appointmentFee: z
      .number()
      .positive()
      .optional(),

    qualification: z.string().optional(),

    currentWorkingPlace: z.string().optional(),

    designation: z.string().optional(),
  }),
});