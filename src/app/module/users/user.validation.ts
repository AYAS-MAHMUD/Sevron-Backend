import { z } from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),

    doctor: z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters"),

      email: z.string().email("Invalid email address"),

      profilePhoto: z
        .string()
        .url("Profile photo must be a valid URL")
        .optional(),

      contactNumber: z
        .string()
        .min(10, "Contact number is too short")
        .max(20, "Contact number is too long")
        .optional(),

      address: z
        .string()
        .max(255, "Address cannot exceed 255 characters")
        .optional(),

      registrationNumber: z.string().min(1, "Registration number is required"),

      experience: z
        .number()
        .int("Experience must be an integer")
        .nonnegative("Experience cannot be negative")
        .optional(),

      gender: z.enum([Gender.MALE, Gender.FEMALE], {
        error: "Invalid gender",
      }),

      appointmentFee: z
        .number()
        .positive("Appointment fee must be greater than 0"),

      qualification: z.string().min(1, "Qualification is required"),

      currentWorkingPlace: z
        .string()
        .min(1, "Current working place is required"),

      designation: z.string().min(1, "Designation is required"),
    }),

    specialties: z
      .array(z.string().uuid("Each specialty must be a valid UUID"))
      .min(1, "At least one specialty is required"),
  }),
});

export const createAdminZodSchema = z.object({
  body: z.object({
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    admin: z.object({
      name: z
        .string("Name is required and must be string")
        .min(5, "Name must be at least 5 characters")
        .max(30, "Name must be at most 30 characters"),
      email: z.email("Invalid email address"),
      contactNumber: z
        .string("Contact number is required")
        .min(11, "Contact number must be at least 11 characters")
        .max(14, "Contact number must be at most 15 characters")
        .optional(),
      profilePhoto: z.url("Profile photo must be a valid URL").optional(),
    }),
    role: z.enum(
      ["ADMIN", "SUPER_ADMIN"],
      "Role must be either ADMIN or SUPER_ADMIN",
    ),
  }),
});
