/** Flat node with expandable and level information */
export class PersonFlatNode {
    constructor(
      public expandable: boolean,
      public level: number,
      public association: string,
      public id: number,
      public name: string,
      public place: string) { }
  }