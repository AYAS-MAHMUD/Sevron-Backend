import { prisma } from "../../lib/prisma";
const createSpeciality = async (payload) => {
    const specialty = await prisma.specialty.create({
        data: {
            title: payload.title,
            description: payload.description,
            icon: payload.icon
        }
    });
    return specialty;
};
const getSpeciality = async () => {
    const specialty = await prisma.specialty.findMany();
    return specialty;
};
const deleteSpeciality = async (id) => {
    const specialty = await prisma.specialty.delete({
        where: {
            id
        }
    });
    return specialty;
};
const updateSpeciality = async (id, payload) => {
    const specialty = await prisma.specialty.update({
        where: {
            id
        },
        data: payload
    });
    return specialty;
};
export const specialityService = {
    createSpeciality,
    getSpeciality,
    deleteSpeciality,
    updateSpeciality
};
