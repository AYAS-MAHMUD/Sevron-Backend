import { StatusCodes } from "http-status-codes";
import { Role, Specialty } from "../../../generated/prisma/client"
import { AppError } from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma"
import { ICreateDoctorPayload } from "./user.interface"
import { auth } from "../../lib/auth";




const createDoctor = async (payload : ICreateDoctorPayload) =>{
    // const result = await 
    const specialitise : Specialty[]  = [];
    // i = [a,b,c,d,e,f]
    for(const i of payload.specialties){
          const speciality = await prisma.specialty.findUnique({
            where : {
                id : i
            }
          })
          if(!speciality){
            throw new AppError(StatusCodes.NO_CONTENT ,"Speciality not found");
          }
          specialitise.push(speciality)
    }

    const userExits = await prisma.user.findUnique({
        where :{
            email : payload.doctor.email
        }
    })
    if(userExits){
        throw new AppError(StatusCodes.CONFLICT, "Doctor already Exits");
    }

    const doctorData = await auth.api.signUpEmail({
        body : {
             email: payload.doctor.email,
            password: payload.password,
            role: Role.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true,
        }
    })

    try {
        
        const result = await prisma.$transaction(async (tx) =>{
            const DataOfDoctor = await tx.doctor.create({
                data : {
                    userId : doctorData.user.id,
                    ...payload.doctor

                }
            })

           
            await tx.doctorSpecialty.createMany({
                data : specialitise.map((i)=>{
                    return {
                        doctorId : DataOfDoctor.id,
                        specialtyId : i.id
                    }
                })
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: DataOfDoctor .id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }

                }
            })

            return doctor;
        })

        
        return result

    } catch (error) {
        console.log("Transaction Error happen : ",error);
        await prisma.user.delete({
            where : {
                id : doctorData.user.id
            }
        })
        throw error
    }
}


export const userService = {
    createDoctor,

}