import {SERVICESTATUS} from './enum';
export interface Service {
    subject:string,
    description:string,
    serviceType:number,
    creationDate:number,
    contactPerson:string,
    serviceStatus:SERVICESTATUS,
    closingDate?:number,
    closingRemark?:string,
    rating?:number,
    closedBy?:string
}