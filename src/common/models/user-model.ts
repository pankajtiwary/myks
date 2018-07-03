import {GENDER,MEMBERTYPE} from './enum';

export interface User {
        // userId:number, 
        firstName:string, 
        lastName:string, 
        mobileNumber:string,
        gender:GENDER, 
        active:boolean, 
        imageLoc?:string, 
        downloadbleUrl?:string,
        createdDate:number, 
        memberTypeId:MEMBERTYPE
}