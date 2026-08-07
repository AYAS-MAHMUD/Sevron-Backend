import { StatusCodes } from "http-status-codes";
import { Role, User, UserStatus } from "../../../generated/prisma/client";
import { AppError } from "../../errorHelper/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { UserTokens } from "../../lib/token";

import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, password, email } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,

      // default hisebe set hobe
      // needPasswordChange : false,
      // role : Role.PATIENT
    },
  });
  if (!data.user) {
    throw new Error("Failed to register user");
  }

  try {
    const patient = await prisma.$transaction(async (tx) => {
      return await tx.patient.create({
        data: {
          userId: data.user.id,
          name: name,
          email: email,
        },
      });
    });

    const getUsertoken = UserTokens(data.user);

    return {
      ...data,
      patient,
      accessToken: getUsertoken.accessToken,
      refreshToken: getUsertoken.refreshToken,
    };
  } catch (error) {
    console.log("Transaction Error happend :", error);

    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });

    throw new AppError(StatusCodes.EXPECTATION_FAILED, "Transaction Error");
  }
};

interface ILoginUser {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status == UserStatus.BLOCKED) {
    throw new Error("User is Blocked");
  }
  if (data.user.status == UserStatus.DELETED) {
    throw new Error("User is Deleted");
  }

  const getUsertoken = UserTokens(data.user);

  return {
    data,
    accessToken: getUsertoken.accessToken,
    refreshToken: getUsertoken.refreshToken,
    sessionToken: data.token,
  };
};

const getMe = async (user: any) => {
  const isUserExits = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      patient: {
        include: {
          appointments: true,
          reviews: true,
          prescriptions: true,
          medicalReports: true,
          patientHealthData: true,
        },
      },
      doctor: {
        include: {
          specialties: true,
          appointments: true,
          reviews: true,
          prescriptions: true,
        },
      },
      admin: true,
    },
  });
  if(!isUserExits){
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  return isUserExits
};

const getNewToken = async (refreshToken : string , sessionToken : string ) =>{
  // console.log("refreshToken : ", refreshToken)
  // console.log("sessionToken : ", sessionToken)
  const isSessionToken = await prisma.session.findUnique({
    where : {
      token : sessionToken
    },
    include : {
      user : true
    }
  })
  if(!isSessionToken){
    throw new AppError(StatusCodes.UNAUTHORIZED , "Invalid session token");
  }
 

    const verifyRefreshToken = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET as string);
    if(!verifyRefreshToken){
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }
   
  
  const isUserExits = await prisma.user.findUnique({
    where : {
      email : (verifyRefreshToken as jwt.JwtPayload).email
    }
  })
  

  const {token} = await prisma.session.update({
    where : {
      token : sessionToken 
    },
    data : {
      token : sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      updatedAt : new Date()
    }
  })
  
  const accessToken = UserTokens(isUserExits as JwtPayload);
  
  return {accessToken : accessToken.accessToken,
     refreshToken : accessToken.refreshToken
    , sessionToken : token }

}

export const authService = {
  registerPatient,
  loginUser,
  getMe,
  getNewToken
};
