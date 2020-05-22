import { Drug, Pharmacy } from "./pharmacy";
import * as drugNames from "./constants"

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("sould decrease benefit by 2 after expiration if drug is not fervex, magic pill, or herbal tea", () => {
    const drug = new Drug("test", 0, 3);
    expect(Pharmacy.updateBenefitValueOtherDrugs(drug)).toEqual(
      new Drug("test", -1, 1)
    );
  });

  it("sould decrease benefit by 1 before expiration if drug is not fervex, magic pill, or herbal tea", () => {
    const drug = new Drug("test", 1, 3);
    expect(Pharmacy.updateBenefitValueOtherDrugs(drug)).toEqual(
      new Drug("test", 0, 2)
    );
  });

  it("sould not affect benefit or expiresIn for Magic pill", () => {
    const drug = new Drug(drugNames.MAGICPILL, 1, 3);
    expect(Pharmacy.updateBenefitValueMagicPill(drug)).toEqual(drug);
  });
});
