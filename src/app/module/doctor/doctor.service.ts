import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma"
import { IUpdateDoctorPayload } from "./doctor.interface";
import { Doctor } from "../../../generated/prisma/browser";



const getAllDoctors  = async () =>{
    const doctors = await prisma.doctor.findMany({
        where : {
            isDeleted : false
        },
        include : {
            user : true,
            specialties : {
                include : {
                    specialty : true
                }
            }
        }
    })
    const totalDoctor = await prisma.doctor.count({
         where : {
            isDeleted : false
        }
    });

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


    const updatedDoctor = await prisma.doctor.update({
        where : {
            id 
        },
        data : payload
    })

    return updatedDoctor
}


const softDeleteDoctorById = async( id : string ) =>{
    const doctor = await prisma.doctor.findUnique({
        where : {
            id : id
        } 
    })
    if(!doctor){
        throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
    }


    const softDeleteDoctor = await prisma.doctor.update({
        where : {
            id 
        },
        data : {
            isDeleted : true,
            deletedAt : new Date()
        }
    })

    return softDeleteDoctor
}

export const doctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctorBYId,
    softDeleteDoctorById

}