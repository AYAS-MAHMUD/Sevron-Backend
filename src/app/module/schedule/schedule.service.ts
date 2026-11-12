import { ICreateSchedulePayload } from "./schedule.interface"



const getAllSchedules = (payload : ICreateSchedulePayload) =>{
    const {startDate , endDate , startTime , endTime} = payload;

    const interval = 30;
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    const schedule = [];
    
    while(currentDate<=lastDate){
        const startDateTime = new Date()
    }



}
const getSchedulesById = () =>{



}
const createSchedules = () =>{



}
const updateSchedules = () =>{



}
const deleteSchedules = () =>{



}



export const scheduleService = {
    getAllSchedules,
    getSchedulesById,
    createSchedules,
    updateSchedules,
    deleteSchedules
}