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




export const adminService = {
    getAllAdmins,

}