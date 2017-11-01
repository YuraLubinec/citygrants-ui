import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetCalculations } from '../models/budgetCalculations';
import { CostItem } from '../models/costItem';

@Injectable()
export class ClientService {

  constructor() { }

  calculateBudget(budget: Budget): BudgetCalculations {

    let calculations = new BudgetCalculations;

    calculations.totalFeeFromOtherSources = budget.costItemsFee.reduce(this.accCallBackOtherSources, 0);
    calculations.totalFeeFromProgram = budget.costItemsFee.reduce(this.accCallBackOtherProject, 0);

    calculations.totalTransportFromOtherSources = budget.costItemsTransport.reduce(this.accCallBackOtherSources, 0);
    calculations.totalTransportFromProgram = budget.costItemsTransport.reduce(this.accCallBackOtherProject, 0);

    calculations.totalNutritionFromOtherSources = budget.costItemsNutrition.reduce(this.accCallBackOtherSources, 0);
    calculations.totalNutritionFromProgram = budget.costItemsNutrition.reduce(this.accCallBackOtherProject, 0);

    calculations.totalRentFromOtherSources = budget.costItemsRent.reduce(this.accCallBackOtherSources, 0);
    calculations.totalRentFromProgram = budget.costItemsRent.reduce(this.accCallBackOtherProject, 0);

    calculations.totalAdministrativeFromOtherSources = budget.costItemsAdministrative.reduce(this.accCallBackOtherSources, 0);
    calculations.totalAdministrativeFromProgram = budget.costItemsAdministrative.reduce(this.accCallBackOtherProject, 0);

    calculations.totalAdvertisingFromOtherSources = budget.costItemsAdvertising.reduce(this.accCallBackOtherSources, 0);
    calculations.totalAdvertisingFromProgram = budget.costItemsAdvertising.reduce(this.accCallBackOtherProject, 0);

    calculations.totalMaterialsFromOtherSources = budget.costItemsMaterial.reduce(this.accCallBackOtherSources, 0);
    calculations.totalMaterialsFromProgram = budget.costItemsMaterial.reduce(this.accCallBackOtherProject, 0);

    calculations.totalOthersFromOtherSources = budget.costItemsOthers.reduce(this.accCallBackOtherSources, 0);
    calculations.totalOthersFromProgram = budget.costItemsOthers.reduce(this.accCallBackOtherProject, 0);

    calculations.totalFromOtherSources = calculations.totalFeeFromOtherSources + calculations.totalTransportFromOtherSources +
      calculations.totalNutritionFromOtherSources + calculations.totalRentFromOtherSources + calculations.totalAdministrativeFromOtherSources
      + calculations.totalAdvertisingFromOtherSources + calculations.totalMaterialsFromOtherSources + calculations.totalOthersFromOtherSources;

    calculations.totalFromProgram = calculations.totalFeeFromProgram + calculations.totalTransportFromProgram +
      calculations.totalNutritionFromProgram + calculations.totalRentFromProgram + calculations.totalAdministrativeFromProgram
      + calculations.totalAdvertisingFromProgram + calculations.totalMaterialsFromProgram + calculations.totalOthersFromProgram;

    return calculations;
  }

  private accCallBackOtherSources(sum: number, current: CostItem): number {
    return sum + current.consumptionsFromOtherSources;

  }

  private accCallBackOtherProject(sum: number, current: CostItem): number {
    return sum + current.consumptionsFromProgram;

  }

}
