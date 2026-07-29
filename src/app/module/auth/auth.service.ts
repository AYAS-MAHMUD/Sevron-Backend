import { Role, User } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";


interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async(payload : IRegisterPatientPayload)=>{
    const {name , password, email} = payload;
    const data = await auth.api.signUpEmail({
        body : {
            name ,
            email,
            password,

            // default hisebe set hobe
            // needPasswordChange : false,
            // role : Role.PATIENT
        }
    })
    if(!data.user){
        throw new Error("Failed to register user")
    }

    // const patient = await prisma.$transaction(async(tx)=>{


    // })
}

export const authService = {
    registerPatient,
    
}