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




export const adminService = {
    getAllAdmins,
getAdminById
}