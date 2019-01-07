import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { PersonNode, IPerson } from "../models";
import { LoggerService } from "../../core/services";

const NO_ASSOCIATION_GROUP_NAME: string = "No Association";

@Injectable()
export class PeopleTreeViewService {
    public $dataChange = new BehaviorSubject<PersonNode[]>([]);
    get data(): PersonNode[] { return this.$dataChange.value; }

    constructor(private loggerService: LoggerService, ) { }

    public buildPersonTree(people: IPerson[], filteredAssociation?: string): PersonNode[] {

        // Iterate through associations and build unique list
        // const uniqueAssociations: string[] = this.getUniqueAssociations(people);

        // Sort all people by name, descending
        people.sort((personA: IPerson, personB: IPerson) => {
            const personNameA = personA.name.toLowerCase();
            const personNameB = personB.name.toLowerCase();

            if (personNameA > personNameB) { return 1; }
            if (personNameA < personNameB) { return -1; }
            return 0;
        })

        // Iterate through people and build the node tree
        let processedAssociations: string[] = [];
        let unknownAssociationNode: PersonNode;
        const data = people.reduce<PersonNode[]>((accumulator, currentPerson) => {
            if (currentPerson.associations) {
                currentPerson.associations.forEach(association => {
                    const associationName = association.toLowerCase();
                    // Apply filter
                    if (!filteredAssociation
                        || (filteredAssociation && associationName.includes(filteredAssociation))) {
                        if (!processedAssociations.includes(associationName)) {
                            // root association node
                            let node = new PersonNode();
                            node.association = associationName;

                            // add children
                            node.children = this.addChildNodesForAssociation(people, associationName);

                            // add root node with children to the output
                            accumulator.push(node);
                            processedAssociations.push(associationName);
                        }
                    }
                });
            } else {

                if (!unknownAssociationNode) {
                    // Create new "No Association" root node
                    unknownAssociationNode = new PersonNode();
                    unknownAssociationNode.association = NO_ASSOCIATION_GROUP_NAME;
                    unknownAssociationNode.children = [];
                }

                const childPerson = this.person2NodeForAssociationName(currentPerson, NO_ASSOCIATION_GROUP_NAME);
                unknownAssociationNode.children.push(childPerson);
            }

            accumulator.sort((rootNodeA: PersonNode, rootNodeB: PersonNode) => {
                const rootNodeNameA = rootNodeA.association.toLowerCase();
                const rootNodeNameB = rootNodeB.association.toLowerCase();

                if (rootNodeNameA > rootNodeNameB) { return 1; }
                if (rootNodeNameA < rootNodeNameB) { return -1; }
                return 0;
            })

            if (unknownAssociationNode) {
                accumulator.splice(0, 0, unknownAssociationNode); // add "No Association" to the output
            }

            return accumulator;

        }, []);

        this.loggerService.log(data);
        // Notify Observers of change
        this.$dataChange.next(data);

        return data;
    }

    // private getUniqueAssociations(people: IPerson[]): string[] {
    //     let uniqueAssociations: string[] = [];
    //     let insertNoAssociationGroup: boolean = false;

    //     uniqueAssociations = people.reduce((accumulator, currentPerson) => {
    //         if (currentPerson.associations) {
    //             currentPerson.associations.forEach((association) => {
    //                 if (accumulator.indexOf(association.toLowerCase()) === -1) {
    //                     accumulator.push(association.toLowerCase());
    //                 }
    //             })
    //         } else {
    //             insertNoAssociationGroup = true;
    //         }
    //         return accumulator.sort(); // Sort by Association Name descending
    //     }, []);

    //     // "No Association" group to be on top, if applicable
    //     if (insertNoAssociationGroup) {
    //         uniqueAssociations.splice(0, 0, NO_ASSOCIATION_GROUP_NAME);
    //     }

    //     return uniqueAssociations;
    // }

    private addChildNodesForAssociation(people: IPerson[], associationName: string): PersonNode[] {
        let childPeopleNodes: PersonNode[] = [];

        people.forEach((person: IPerson) => {
            if (person.associations && person.associations!.find(a => a === associationName) !== undefined) {
                childPeopleNodes.push(this.person2NodeForAssociationName(person, associationName))
            }
        })

        return childPeopleNodes;
    }

    private person2NodeForAssociationName(person: IPerson, associationName: string): PersonNode {
        let personNode = new PersonNode;
        personNode.association = associationName;
        personNode.id = person.id;
        personNode.name = person.name;
        personNode.place = person.place;
        return personNode;
    }

    // /**
    //  * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
    //  * The return value is the list of `FileNode`.
    //  */
    // buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
    //     return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
    //         const value = obj[key];
    //         const node = new FileNode();
    //         node.filename = key;

    //         if (value != null) {
    //             if (typeof value === "object") {
    //                 node.children = this.buildFileTree(value, level + 1);
    //             } else {
    //                 node.type = value;
    //             }
    //         }

    //         return accumulator.concat(node);
    //     }, []);
    // }
}
