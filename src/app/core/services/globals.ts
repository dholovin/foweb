import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    public deepCopy(obj: any): any {
        return Object.assign({}, obj);
    }
}
