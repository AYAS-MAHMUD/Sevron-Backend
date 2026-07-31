import { Router } from "express";
import { userRouter } from "../module/users/user.route";
import { specialityRouter } from "../module/speciality/speciality.route";
import { authRouter } from "../module/auth/auth.route";
import { doctorRouter } from "../module/doctor/doctor.route";


const router = Router()

const moduleRoutes = [
    {
        path : "/user",
        route : userRouter
    },
    {
        path : "/speciality",
        route : specialityRouter
    },
    {
        path : "/auth",
        route : authRouter        
    },
    {
        path : "/doctor",
        route : doctorRouter
    }
]

moduleRoutes.forEach(i=> router.use(i.path,i.route))


export default router;



// router.use("path",route);