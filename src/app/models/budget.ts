import { CostItem } from './costItem'

export class Budget {
   
    costItemsFee: Array<CostItem>;
    totalFeeFromProgram: number;
    totalFeeFromOtherSources: number;
    
    costItemsTransport: Array<CostItem>;
    totalTransportFromProgram: number;
    totalTransportFromOtherSources: number;
   
    costItemsNutrition: Array<CostItem>;
    totalNutritionFromProgram: number;
    totalNutritionFromOtherSources: number;
   
    costItemsRent: Array<CostItem>;
    totalRentFromProgram: number;
    totalRentFromOtherSources: number;
   
    costItemsAdministrative: Array<CostItem>;
    totalAdministrativeFromProgram: number;
    totalAdministrativeFromOtherSources: number;
   
    costItemsAdvertising: Array<CostItem>;
    totalAdvertisingFromProgram: number;
    totalAdvertisingFromOtherSources: number;
   
    costItemsMaterial: Array<CostItem>;
    totalMaterialsFromProgram: number;
    totalMaterialsFromOtherSources: number;
   
    costItemsOthers: Array<CostItem>;
    totalOthersFromProgram: number;
    totalOthersFromOtherSources: number;

    totalFromProgram: number;
    totalFromOtherSources: number;

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