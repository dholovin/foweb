import { IBaseModel } from "../../shared/models";

export interface IUpsertPerson extends IBaseModel {
    name: string; // met a person 'named'
    place: string; // at specific place (may be used for grouping)
    
    date?: Date; // on specific date
    note?: string; // free form note, in addition to associations 
    associations?: string[]; // have following associations (may be used for grouping)
    image?: any; // TODO: define type representation
}