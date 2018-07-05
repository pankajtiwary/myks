import { ServiceType } from '../common/models/servicetype';

export class ServiceTypeService {

    serviceType:ServiceType[] = [];
    constructor() {
        this.serviceType = [
            {serviceTypeId:1,icon:"addperson",title:'Add/Modify Member'},
            {serviceTypeId:2,icon:"swimming",title:'Swimming Pass'},
            {serviceTypeId:3,icon:"electrician",title:'Electrician'},
            {serviceTypeId:4,icon:"plumber",title:'Plumber'},
            {serviceTypeId:5,icon:"housekeeping",title:'Hourse Keeping'},
            {serviceTypeId:6,icon:"carpenter",title:'Carpenter'}
        ];
    }

    getIconName(serviceTypeId:number) {
        return this.serviceType[serviceTypeId -1].icon;
    }

    getTitle(serviceTypeId:number){
        return this.serviceType[serviceTypeId -1].title;
    }

    getServiceObject(serviceTypeId:number) {
        return this.serviceType[serviceTypeId -1];
    }


}