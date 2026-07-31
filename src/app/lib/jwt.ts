
import jwt , { JwtPayload, SignOptions} from "jsonwebtoken"


export const generateToken = (payload:JwtPayload, secret : string, expire : string) =>{
    return jwt.sign(payload,secret,{expiresIn : expire} as SignOptions)
}

