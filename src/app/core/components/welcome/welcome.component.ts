import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
    selector: "fo-welcome",
    templateUrl: "./welcome.component.html",
    animations: [
        trigger("foFadeAnimation", [
            // fade out when created. this could also be written as transition("void => *")
            transition(":enter", [
                style({ opacity: 0 }),
                animate(1000)
            ]),
        ])
    ]
})
export class WelcomeComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
