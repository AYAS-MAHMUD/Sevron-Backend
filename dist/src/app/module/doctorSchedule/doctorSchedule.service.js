import { prisma } from "../../lib/prisma";
const createMyDoctorSchedule = async (user, payload) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
        doctorId: doctorData.id,
        scheduleId
    }));
    const result = await prisma.doctorSchedules.createMany({
        data: doctorScheduleData
    });
    return result;
};
const getMyDoctorSchedules = async (user, query) => {
};
const getAllDoctorSchedules = async (query) => {
};
const getDoctorScheduleById = async (doctorId, scheduleId) => {
    const doctorSchedule = await prisma.doctorSchedules.findUnique({
        where: {
            doctorId_scheduleId: {
                doctorId: doctorId,
                scheduleId: scheduleId
            }
        },
        include: {
            schedule: true,
            doctor: true
        }
    });
    return doctorSchedule;
};
const updateMyDoctorSchedule = async (user, payload) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const deleteIds = payload.scheduleIds.filter(schedule => schedule.shouldDelete).map(schedule => schedule.id);
    const createIds = payload.scheduleIds.filter(schedule => !schedule.shouldDelete).map(schedule => schedule.id);
    const result = await prisma.$transaction(async (tx) => {
        await tx.doctorSchedules.deleteMany({
            where: {
                isBooked: false,
                doctorId: doctorData.id,
                scheduleId: {
                    in: deleteIds
                }
            }
        });
        const doctorScheduleData = createIds.map((scheduleId) => ({
            doctorId: doctorData.id,
            scheduleId
        }));
        const result = await tx.doctorSchedules.createMany({
            data: doctorScheduleData
        });
        return result;
    });
    return result;
};
const deleteMyDoctorSchedule = async (id, user) => {
};
export const DoctorScheduleService = {
    createMyDoctorSchedule,
    getAllDoctorSchedules,
    getDoctorScheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule,
    getMyDoctorSchedules
};
