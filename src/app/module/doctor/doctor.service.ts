import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma"



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

export const doctorService = {
    getAllDoctors,
    getDoctorById,


}