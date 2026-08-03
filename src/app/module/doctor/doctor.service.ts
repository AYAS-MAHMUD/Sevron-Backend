import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma"
import { IUpdateDoctorPayload } from "./doctor.interface";
import { Doctor } from "../../../generated/prisma/browser";



const getAllDoctors  = async () =>{
    const doctors = await prisma.doctor.findMany({
        include : {
            user : true,
            specialties : {
                include : {
                    specialty : true
                }
            }
        }
    })
    const totalDoctor = await prisma.doctor.count();

    return {
        doctors,
        totalDoctor
    }
}


const getDoctorById = async( id : string) =>{
    const doctor = await prisma.doctor.findUnique({
        where : {
            id 
        },
        include : {
            specialties : {
                include : {
                    specialty : true
                }
            }
        }
        
    })
    if(!doctor){
        throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
    }
    return doctor
}



const updateDoctorBYId = async( id : string , payload : IUpdateDoctorPayload) =>{
    const doctor = await prisma.doctor.findUnique({
        where : {
            id : id
        } 
    })
    if(!doctor){
        throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
    }
    console.log("user found")

    const updatedDoctor = await prisma.doctor.update({
        where : {
            id 
        },
        data : payload
    })

    return updatedDoctor
}

export const doctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctorBYId,


}