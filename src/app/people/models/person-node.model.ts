/**
 * Person node data with nested structure
 */
export class PersonNode {
    association: string; // root level node (all grouped by association)
    children?: PersonNode[];
    id?: number;
    name?: string;
    place?: string;
}