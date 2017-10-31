import { CostItem } from './costItem'

export class Budget {
    costItemsFee: Array<CostItem>;
    costItemsTransport: Array<CostItem>;
    costItemsNutrition: Array<CostItem>;
    costItemsRent: Array<CostItem>;
    costItemsAdministrative: Array<CostItem>;
    costItemsAdvertising: Array<CostItem>;
    costItemsMaterial: Array<CostItem>;
    costItemsOthers: Array<CostItem>;

    constructor(costItemsFee: Array<CostItem>, costItemsTransport: Array<CostItem>,
        costItemsNutrition: Array<CostItem>, costItemsRent: Array<CostItem>,
        costItemsAdministrative: Array<CostItem>, costItemsAdvertising: Array<CostItem>,
        costItemsMaterial: Array<CostItem>, costItemsOthers: Array<CostItem>) {

        this.costItemsFee = costItemsFee;
        this.costItemsTransport = costItemsTransport;
        this.costItemsNutrition = costItemsNutrition;
        this.costItemsRent = costItemsRent;
        this.costItemsAdministrative = costItemsAdministrative;
        this.costItemsAdvertising = costItemsAdvertising;
        this.costItemsMaterial = costItemsMaterial;
        this.costItemsOthers = costItemsOthers;

    }
}