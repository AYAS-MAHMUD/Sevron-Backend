
import { z } from "zod";



export const doctorUpdateValiation = z.object({
    password : z.string(),
    body : {
        name : z.string().min(4,"maximumber ")
    }
})