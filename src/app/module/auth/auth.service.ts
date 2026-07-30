import { Role, User, UserStatus } from "../../../generated/prisma/client";
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

    const patient = await prisma.$transaction(async(tx)=>{
        return await tx.patient.create({
            data : {
                userId : data.user.id,
                name : name,
                email : email,

            }
        })

    })
    return {
        ...data,
        patient
    }
}





interface ILoginUser {
    email : string,
    password : string
}

const loginUser = async(payload : ILoginUser) =>{
    const {email, password}  = payload ;

    const data = await auth.api.signInEmail({
        body : {
            email,
            password
        }
    })

    if(data.user.status == UserStatus.BLOCKED){
        throw new Error("User is Blocked");
    }
    if(data.user.status == UserStatus.DELETED){
        throw new Error("User is Deleted");
    }

    return data
}







export const authService = {
    registerPatient,
    loginUser
}