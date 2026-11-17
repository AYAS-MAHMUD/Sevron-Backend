import { addHours, addMinutes, format } from "date-fns";
import { ICreateSchedulePayload } from "./schedule.interface";
import { convertDatetime } from "./schedule.utils";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/queryBuilders";
import { Prisma, Schedule } from "../../../generated/prisma/browser";
import {
  scheduleFilterableFields,
  scheduleIncludeConfig,
  scheduleSearchableFields,
} from "./schedule.constant";

import { IQueryParams } from "../../interface/query.interface";

const createSchedules= async (payload: ICreateSchedulePayload) =>{
    const { startDate, endDate, startTime, endTime } = payload;

    const interval = 30;

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    const schedules = [];

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0])
                ),
                Number(startTime.split(":")[1])
            )
        );

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0])
                ),
                Number(endTime.split(":")[1])
            )
        );

        while (startDateTime < endDateTime) {
            const s = await convertDatetime(startDateTime);
            const e = await convertDatetime(addMinutes(startDateTime, interval));

            const scheduleData = {
                startDateTime: s,
                endDateTime: e
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime
                }
            })

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                })
                console.log(result);
                schedules.push(result);
            }

            startDateTime.setMinutes(startDateTime.getMinutes() + interval)
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedules;
}


const getAllSchedules = async (query : IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Schedule,
    Prisma.ScheduleWhereInput,
    Prisma.ScheduleInclude
  >(prisma.schedule, query, {
    searchableFields: scheduleSearchableFields,
    filterableFields: scheduleFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    .dynamicInclude(scheduleIncludeConfig)
    .sort()
    .fields()
    .execute();

  return result;
};

const getSchedulesById = async (id: string) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id,
    },
    include: {
      doctorSchedules: {
        include: {
          doctor: true,
        },
      },
      appointments: true,
    },
  });

  if (!schedule) {
    throw new Error("Schedule not found");
  }
  return schedule;
};

const updateSchedules = async (id: string, payload: any) => {
  const existingSchedule = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });

  if (!existingSchedule) {
    throw new Error("Schedule not found");
  }

  const updatedSchedule = await prisma.schedule.update({
    where: {
      id,
    },
    data: payload,
    include: {
      doctorSchedules: true,
    },
  });

  return updatedSchedule;
};

const deleteSchedules = async (id: string) => {
  const existingSchedule = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });

  if (!existingSchedule) {
    throw new Error("Schedule not found");
  }

  const deletedSchedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });

  return deletedSchedule;
};

export const scheduleService = {
  getAllSchedules,
  getSchedulesById,
  createSchedules,
  updateSchedules,
  deleteSchedules,
};
