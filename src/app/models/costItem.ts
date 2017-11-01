export class CostItem {

    description: string;
    cost: string;
    count: string;
    consumptionsFromProgram: number;
    consumptionsFromOtherSources: number;

    constructor(description: string, cost: string, count: string,
        consumptionsFromProgram: number, consumptionsFromOtherSources: number) {
        this.description = description;
        this.cost = cost;
        this.count = count;
        this.consumptionsFromProgram = consumptionsFromProgram;
        this.consumptionsFromOtherSources = consumptionsFromOtherSources;
    }
}