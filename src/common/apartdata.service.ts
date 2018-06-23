
export class ApartmentDataService {

    apartment:any[];
    floorPlan:any[];

    constructor() {
        this.floorPlan = [
            {floorId:1,floorName:'First',  flats:[101,102,103,104]},
            {floorId:2,floorName:'Second', flats:[201,202,203,204]},
            {floorId:3,floorName:'Third',  flats:[301,302,303,304]},
            {floorId:4,floorName:'Fourth', flats:[401,402,403,404]},
            {floorId:5,floorName:'Fifth',  flats:[501,502,503,504]},
            {floorId:6,floorName:'Sixth',  flats:[601,602,603,604]},
            {floorId:7,floorName:'Seventh',flats:[701,702,703,704]}
        ];
        this.apartment = [
            {id: 1, name:"Aster", floors:[...this.floorPlan]},
            {id: 2, name:"Cosmos", floors:[...this.floorPlan]},
            {id: 3, name:"Daffodil", floors:[...this.floorPlan]},
            {id: 4, name:"Lotus", floors:[...this.floorPlan]},
            {id: 5, name:"Tulip", floors:[...this.floorPlan]},
        ]


    }

    getApartment() {
        return this.apartment;
    }

    getFloorPlan() {
        return this.floorPlan;
    }
}