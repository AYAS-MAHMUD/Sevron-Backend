import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { bearer } from "better-auth/plugins/bearer";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";
import { config } from "../config/config";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
    baseURL : config.better_auth_url,
    secret : config.better_auth_secret, 
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword  : {
        enabled : true,
        requireEmailVerification : true
    },
    emailVerification :{
        sendOnSignUp : true,
        sendOnSignIn : true,
        autoSignInAfterVerification : true
    },
    user : {
        additionalFields : {
            role : {
                type : "string",
                required : true,
                defaultValue : Role.PATIENT
            },
            status  : {
                type : "string",
                required : true,
                defaultValue : UserStatus.ACTIVE
            },
            needPasswordChange : {
                type : "boolean",
                required : true,
                defaultValue : false

            },
             isDeleted : {
                type : "boolean",
                required : true,
                defaultValue : false

            },
            deletedAt : {
                type : "date",
                required : false,
                defaultValue : null
            }
        }
    },
    plugins : [
        bearer(),
        emailOTP({
            overrideDefaultEmailVerification : true,
            async sendVerificationOTP({email, otp , type}){
                if(type == "email-verification"){
                    const user = await prisma.user.findUnique({
                        where :{
                            email
                        }
                    })
                    if(user && !user.emailVerified){
                        sendEmail({
                            to : email,
                            subject : "Verify your email",
                            templateName : "otp",
                            templateData : {
                                name : user.name,
                                otp
                            }
                        })
                    }
                }else if (type == "forget-password"){
                    const user = await prisma.user.findUnique({
                        where : {
                            email
                        }
                    })
                    if(user && user.emailVerified){
                        sendEmail({
                            to : email,
                            subject : "Reset your password",
                            templateName : "otp",
                            templateData : {
                                name : user.name,
                                otp
                            }
                        })
                    }
                }
            },
            expiresIn : 2 * 60 ,
            otpLength : 6
        })
    ],
    session : {
        expiresIn : 60 * 60 * 60 * 24,
        cookieCache : {
            enabled : true,
        }
    },
    socialProviders :{
        google : {
            clientId : config.google.google_client_id as string,
            clientSecret :  config.google.google_client_secret as string,
            mapProfileToUser : () =>{
                return {
                    role : Role.PATIENT,
                    status : UserStatus.ACTIVE,
                    needPasswordChange : false,
                    emailVerified : true,
                    isDeleted : false,
                    deletedAt : null
                }
            }
        }
    },
    redirectURLs :{
         signIn : `${config.better_auth_url  }/api/v1/auth/google/success`,
    },
    advanced : {
        useSecureCookies : false,
        cookies : {
            state : {
                attributes : {
                    sameSite : "none",
                    secure : true,
                    httpOnly : true,
                    path : "/"
                }
            },
            sessionToken : {
                attributes : {
                    sameSite : "none",
                    secure : true,
                    httpOnly : true,
                    path : "/"
                }
            }
        }
    }
    // after writing social provider and advance you have to go app.ts and add app.use("/api/auth",toNodeHandler(aut
    


});