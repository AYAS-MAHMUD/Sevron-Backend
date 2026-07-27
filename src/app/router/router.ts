import { Router } from "express";
import { userRouter } from "../module/users/user.route";


const router = Router()

const moduleRoutes = [
    {
        path : "/user",
        route : userRouter
    }
]

moduleRoutes.forEach(i=> router.use(i.path,i.route))


export default router;



// router.use("path",route);