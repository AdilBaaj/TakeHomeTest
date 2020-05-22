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
    if (drug.name != drugNames.HERBALTEA && drug.name != drugNames.FERVEX) {
      if (drug.benefit > 0) {
        if (drug.name != drugNames.MAGICPILL) {
          drug.benefit = drug.benefit - 1;
        }
      }
    } else {
      if (drug.benefit < 50) {
        drug.benefit = drug.benefit + 1;
        if (drug.name == drugNames.FERVEX) {
          if (drug.expiresIn < 11) {
            if (drug.benefit < 50) {
              drug.benefit = drug.benefit + 1;
            }
          }
          if (drug.expiresIn < 6) {
            if (drug.benefit < 50) {
              drug.benefit = drug.benefit + 1;
            }
          }
        }
      }
    }
    if (drug.name != drugNames.MAGICPILL) {
      drug.expiresIn = drug.expiresIn - 1;
    }
    if (drug.expiresIn < 0) {
      if (drug.name != drugNames.HERBALTEA) {
        if (drug.name != drugNames.FERVEX) {
          if (drug.benefit > 0) {
            if (drug.name != drugNames.MAGICPILL) {
              drug.benefit = drug.benefit - 1;
            }
          }
        } else {
          drug.benefit = drug.benefit - drug.benefit;
        }
      } else {
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;
        }
      }
    }
    return drug;
  }
}
