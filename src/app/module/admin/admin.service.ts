import { StatusCodes } from "http-status-codes"
import { AppError } from "../../errorHelper/AppError"
import { prisma } from "../../lib/prisma"




const getAllAdmins = async () =>{
    const allAdmin = await prisma.admin.findMany({
        where :{
            isDeleted : false
        },
        include : {
            user :  true
        }
    })
    const totalAdmin = await prisma.admin.count({
        where :{
            isDeleted : false
        }
    })
    return {
        totalAdmin , 
        allAdmin
    }

}


const getAdminById = async (id : string) =>{
    const admin = await prisma.admin.findUnique({
        where : {
            id : id
        },
        include : {
            user : true
        }
    })
    return admin
}

const updateAdminById = async (id : string , payload : any) =>{
    const admin = await prisma.admin.findUnique({
        where : {
            id : id
        }
    })
    if(!admin){
        throw new AppError(StatusCodes.NOT_FOUND, "Admin not found");
    }

    const updatedAdmin = await prisma.admin.update({
        where : {
            id : id
        },
        data : payload
    })
    return updatedAdmin
}


const softDeleteAdminById = async (id : string) =>{
    const admin = await prisma.admin.findUnique({
        where : {
            id : id
        }
    })
    if(!admin){
        throw new AppError(StatusCodes.NOT_FOUND, "Admin not found");
    }

     const deletedAdmin = await prisma.admin.update({
        where : {
            id : id
        },
        data : {
            isDeleted : true,
            deletedAt : new Date()
        }
    })
    return deletedAdmin
}


export const adminService = {
    getAllAdmins,
getAdminById,
updateAdminById,
softDeleteAdminById
}