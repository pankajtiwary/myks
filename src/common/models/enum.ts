const MYKS:string='myks'

export enum GENDER {
    MALE='male',
    FEMALE='female'
}

export enum MEMBERTYPE {
    OWNER=1,
    RENTAL=2,
    RELATIVE=3,
    OTHERS=4
}

export enum PATHNAME {
    // MYKS='myks',
    PROFILES= 'myks/profiles',
    FLATOWNERMAPPING='myks/flatownermapping',
    SUBSCRIPTIONTYPE='myks/masterdata/subscriptiontype',
    MEMBERTYPE='myks/masterdata/membertype',
    APARTMENT='myks/masterdata/apartment',
    SERVICETYPE='myks/masterdata/servicetype',
}

export enum MODE {
    EDIT='edit',
    CREATE='create',
    MODE='mode'
}

export enum APPCONST {
    FLATLOGINDETAILS='flatLoginDetails'
}

export enum STATUS {
    EXPIRED='expired',
    ABOUTTOEXPIRE='aboutToExpired',
    LIVE='live'

}