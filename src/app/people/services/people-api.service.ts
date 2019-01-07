import { Injectable } from "@angular/core";
import { IPerson, PersonNode } from "../models";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { LoggerService, BaseApiService } from "../../core/services";

const TIMEOUT: number = 1000; // to emulate network latency
// TODO: replace stub with real values
let PEOPLE = [
    {
        id: 1,
        name: "John Doe",
        place: "soccer",
        note: "2 daughters. younger is Zlata and elder is Sofa. wife - Erica. Plays good. Phone xxx-xxx-xx-xx",
        associations: [
            "soccer",
            "ukraine",
            "ukrainian",
            "khmelniskiy",
            "dieppe",
        ],
    },
    {
        id: 2,
        name: "Clarisse",
        place: "hospital",
        date: new Date(),
        note: "first surved and helped a lot. very nice",
        associations: [
            "hospital",
            "nurse",
            "french",
            "victoria-daughter",
            "glasses",
        ],
    },
    {
        id: 3,
        name: "Dave",
        place: "Isabella\'s birthday party",
        date: new Date(),
        note: "Dave was born in Moncton, wife ??? from Columbia, Isabella turned 3 in 2018, dog Phoenix",
        associations: [
            "birthday party",
            "daycare",
            "roman-son",
            "big house",
            "dieppe",
            "great host",
        ],
    },
    {
        id: 4,
        name: "Bob",
        place: "Isabella\'s birthday party",
        date: new Date(),
        note: "wife Jane, 7 years daughter (2018), works at ymca, very funny",
        associations: [
            "birthday party",
            "daycare",
            "roman-son",
            "big house",
            "dieppe",
            "funny",
            "Ymca",
            "ymca",
        ],
    },
    {
        id: 5,
        name: "someone unknown",
        place: "don\'t remember",
        date: new Date(),
    }
] as IPerson[];

@Injectable()
export class PeopleApiService {

    constructor(private baseApiService: BaseApiService,
        private loggerService: LoggerService) {

        // TODO: remove. Just for testing BaseApiService wrapper
        baseApiService.get("https://www.techiediaries.com/api/data.json")
            .subscribe((response) => {
                loggerService.log(response);
            }, (error: any) => {
                var err = error;
            });
    }

    public getPeople(): Observable<IPerson[]> {
        return of(PEOPLE).pipe(delay(TIMEOUT));
    }

    public getPerson(id: number): Observable<IPerson> {
        return of(PEOPLE.find((person: IPerson) => person.id === id))
            .pipe(delay(TIMEOUT));
    }

    public deletePerson(id: number): Observable<IPerson[]> {
        let personIndex: number = PEOPLE.findIndex(person => person.id === id);
        if (personIndex !== -1) {
            PEOPLE.splice(personIndex, 1);
        }

        return of(PEOPLE).pipe(delay(TIMEOUT));
    }
}