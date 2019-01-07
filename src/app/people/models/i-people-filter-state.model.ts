import { IBaseModel } from "../../shared/models";
import { PeopleViewMode } from "./people-view-mode.enum";

export interface IPeopleFilterState extends IBaseModel {
    filterString: string;
    viewMode: PeopleViewMode;
}