
export class MyFamilyService {

    private myfamily:any[];

    constructor() {
        this.myfamily = [{userId: 1, firstName:"Pankaj", lastName:"Tiwary", 
        gender:"Male", startDate:"20-Apr-2016", 
        endDate:"20-Jun-2020", img:"assets/imgs/pankaj.jpg",
        type:"owner",status:"expired"},
    
        {userId: 2,firstName:"Sudha", lastName:"Tiwary", 
        gender:"Female", startDate:"20-Apr-2016", 
        endDate:"20-Jun-2020", img:"assets/imgs/sudha.JPG",
        type:"owner",status:"aboutToExpired"},
    
        {userId: 3,firstName:"Shaurya", lastName:"Tiwary", 
        gender:"Male", startDate:"20-Apr-2016", 
        endDate:"20-Jun-2020", img:"assets/imgs/shaurya.jpg",
        type:"owner",status:"live"}]
    }
     
    getMyFamilyData() {
        return this.myfamily;
    }

}