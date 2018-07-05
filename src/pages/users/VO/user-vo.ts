import { User } from '../../../common/models/user-model';

export interface UserVO extends User {
    key:string,
    type:string,
    status:string
}