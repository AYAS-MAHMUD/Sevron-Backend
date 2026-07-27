import { prisma } from "../../lib/prisma"




const userCreate = async (payload : any) =>{

    const result = await prisma.user.create({
        data : {
            name : payload.name,
            email : payload.email
        }
    })


    return result

}


export const userService = {
    userCreate,

}