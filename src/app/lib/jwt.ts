
import jwt , { JwtPayload, SignOptions} from "jsonwebtoken"

// For generate Token

export const generateToken = (payload:JwtPayload, secret : string, expires : string ) =>{
    return jwt.sign(payload,secret,{expiresIn : expires} as SignOptions )
}



// For verify Token

export const verifyToken = (token : string , secret : string) => {
    return jwt.verify(token,secret) as JwtPayload
}

// For decode Token

export const decodeToken = (token : string) => {
    return jwt.decode(token) as JwtPayload
}

