import * as drugNames from "./constants";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.map(drug => {
      switch (drug.name) {
        case drugNames.MAGICPILL:
          drug = Pharmacy.updateBenefitValueMagicPill(drug);
          break;
        case drugNames.HERBALTEA:
          drug = Pharmacy.updateBenefitValueHerbalTea(drug);
          break;
        case drugNames.FERVEX:
          drug = Pharmacy.updateBenefitValueFervex(drug);
          break;
        default:
          drug = Pharmacy.updateBenefitValueOtherDrugs(drug);
          break;
      }
    });
    return this.drugs;
  }

  static updateBenefitValueOtherDrugs(drug) {
    drug.expiresIn = drug.expiresIn - 1;
    const decreaseInBenefit = drug.expiresIn >= 0 ? 1 : 2;
    drug.benefit = Math.max(0, drug.benefit - decreaseInBenefit);
    return drug;
  }

  static updateBenefitValueMagicPill(drug) {
    return drug;
  }

  static updateBenefitValueHerbalTea(drug) {
    drug.expiresIn = drug.expiresIn - 1;
    const increaseInBenefit = drug.expiresIn >= 0 ? 1 : 2;
    drug.benefit = Math.min(50, drug.benefit + increaseInBenefit);
    return drug;
  }

  static updateBenefitValueFervex(drug) {
    drug.expiresIn = drug.expiresIn - 1;
    let increaseInBenefit = 1;

    if (drug.expiresIn <= 4) {
      increaseInBenefit = 3;
    } else if (drug.expiresIn <= 9) {
      increaseInBenefit = 2;
    }

    const isDrugExpired = drug.expiresIn < 0 ? 0 : 1;
    drug.benefit = Math.min(
      50,
      isDrugExpired * (drug.benefit + increaseInBenefit)
    );
    return drug;
  }
}
