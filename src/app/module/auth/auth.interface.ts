import { Role } from "../../../generated/prisma/enums";

export interface IRequestUser{
    userId : string;
    role : Role;
    email : string;
}


export interface ILoginUser {
  email: string;
  password: string;
}


export interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}