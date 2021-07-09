import { userI } from 'src/app/shared/model/user.interface';

export class RoleValidator{
    isBusiness(user: userI):boolean{
        return user.role == 'BUSINES';
    }
}