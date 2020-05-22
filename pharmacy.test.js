import { Drug, Pharmacy } from "./pharmacy";
import * as drugNames from "./constants";

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

  it("sould increase benefit by 2 after expiration if drug is herbal tea", () => {
    const drug = new Drug(drugNames.HERBALTEA, 0, 3);
    expect(Pharmacy.updateBenefitValueHerbalTea(drug)).toEqual(
      new Drug(drugNames.HERBALTEA, -1, 5)
    );
  });

  it("sould increase benefit by 1 before expiration if drug is herbal tea", () => {
    const drug = new Drug(drugNames.HERBALTEA, 1, 3);
    expect(Pharmacy.updateBenefitValueHerbalTea(drug)).toEqual(
      new Drug(drugNames.HERBALTEA, 0, 4)
    );
  });

  it("sould increase benefit by 1 ten days or more before expiration if drug is fervex", () => {
    const drug = new Drug(drugNames.FERVEX, 11, 3);
    expect(Pharmacy.updateBenefitValueFervex(drug)).toEqual(
      new Drug(drugNames.FERVEX, 10, 4)
    );
  });

  it("sould increase benefit by 2 between ten and five days before expiration if drug is fervex", () => {
    const drug = new Drug(drugNames.FERVEX, 10, 3);
    expect(Pharmacy.updateBenefitValueFervex(drug)).toEqual(
      new Drug(drugNames.FERVEX, 9, 5)
    );
  });

  it("sould increase benefit by 3 between five days before expiration if drug is fervex", () => {
    const drug = new Drug(drugNames.FERVEX, 5, 3);
    expect(Pharmacy.updateBenefitValueFervex(drug)).toEqual(
      new Drug(drugNames.FERVEX, 4, 6)
    );
  });

  it("sould drop benefit to 0 after expiration if drug is fervex", () => {
    const drug = new Drug(drugNames.FERVEX, 0, 30);
    expect(Pharmacy.updateBenefitValueFervex(drug)).toEqual(
      new Drug(drugNames.FERVEX, -1, 0)
    );
  });
});
