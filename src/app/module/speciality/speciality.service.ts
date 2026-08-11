import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"



const createSpeciality = async (payload: Specialty): Promise<Specialty> => {

    const specialty = await prisma.specialty.create({
        data: {
            title : payload.title,
            description : payload.description,
            icon : payload.icon
        }
    })

    return specialty;

}



const getSpeciality = async () :  Promise<Specialty[]>=> {

    const specialty = await prisma.specialty.findMany()

    return specialty;

}


const deleteSpeciality = async (id : string)=> {

    const specialty = await prisma.specialty.delete({
        where : {
            id
        }
    })

    return specialty
}



const updateSpeciality = async (id : string, payload : any)=> {

    const specialty = await prisma.specialty.update({
        where : {
            id
        },
        data : payload
    })

    return specialty
}


export const specialityService = {
    createSpeciality,
    getSpeciality,
    deleteSpeciality,
    updateSpeciality
    
}