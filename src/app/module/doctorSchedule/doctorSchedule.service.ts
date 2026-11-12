import { IQueryParams } from "../../interface/query.interface"
import { IRequestUser } from "../auth/auth.interface"
import { ICreateDoctorSchedulePayload, IUpdateDoctorSchedulePayload } from "./doctorSchedule.interface"



const createMyDoctorSchedule = async (user : IRequestUser, payload : ICreateDoctorSchedulePayload) => {

}

const getMyDoctorSchedules = async (user : IRequestUser, query : IQueryParams) => {

}

const getAllDoctorSchedules = async (query: IQueryParams) => {

}

const getDoctorScheduleById = async (doctorId: string, scheduleId: string) => {

}


const updateMyDoctorSchedule = async (user : IRequestUser, payload: IUpdateDoctorSchedulePayload) => {

}

const deleteMyDoctorSchedule = async (id: string, user: IRequestUser) => {

}







export const DoctorScheduleService = {
    createMyDoctorSchedule,
    getAllDoctorSchedules,
    getDoctorScheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule,
    getMyDoctorSchedules
}