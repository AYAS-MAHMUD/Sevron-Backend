import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"



const createSpeciality = async (payload: Specialty): Promise<Specialty> => {

    const specialty = await prisma.specialty.create({
        data: payload
    })

    return specialty;

}



const getSpeciality = async ()=> {

    const specialty = await prisma.specialty.findMany()

    return specialty;

}


export const specialityService = {
    createSpeciality,
    getSpeciality
    
}