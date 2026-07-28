import { Router } from "express";
import { userRouter } from "../module/users/user.route";
import { specialityRouter } from "../module/speciality/speciality.route";


const router = Router()

const moduleRoutes = [
    {
        path : "/user",
        route : userRouter
    },
    {
        path : "/speciality",
        route : specialityRouter
    }
]

moduleRoutes.forEach(i=> router.use(i.path,i.route))


export default router;



// router.use("path",route);