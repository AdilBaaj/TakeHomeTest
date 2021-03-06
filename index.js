import { Drug, Pharmacy } from "./pharmacy";
import * as drugNames from "./constants";

import fs from "fs";

const drugs = [
  new Drug("Doliprane", 20, 30),
  new Drug(drugNames.HERBALTEA, 10, 5),
  new Drug(drugNames.FERVEX, 5, 40),
  new Drug(drugNames.MAGICPILL, 15, 40),
  new Drug(drugNames.DAFALGAN, 15, 40)
];
const trial = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
