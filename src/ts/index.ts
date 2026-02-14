import "./variables";

import {
  totalCaloriesDisplay,
  showCalorieUpdateButton,
  updateCalorieTotalButton,
  resetCalorieButton,
  cancelUpdateButton,
  calorieInput,
} from "./elements";

import {
  showCalorieUpdate,
  updateCalorieTotal,
  resetCalorieTotal,
  cancelCalorieUpdate,
  updateCalorieDisplayColour,
} from "./functions";

/*--------------------------------------------
| VARIABLES
|---------------------------------------------
|
*/

const caloriesAlreadyConsumed = JSON.parse(
  localStorage.getItem("totalCaloriesConsumedToday") || "0",
);

/*--------------------------------------------
| INITIALISATION
|---------------------------------------------
|
*/

updateCalorieDisplayColour(caloriesAlreadyConsumed, calorieDailyLimit);

totalCaloriesDisplay.textContent = JSON.parse(
  localStorage.getItem("totalCaloriesConsumedToday") || "0",
);

/*--------------------------------------------
| EVENT LISTENERS
|---------------------------------------------
|
*/

calorieInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") updateCalorieTotal();
});

showCalorieUpdateButton.addEventListener("click", () => showCalorieUpdate());
updateCalorieTotalButton.addEventListener("click", () => updateCalorieTotal());
resetCalorieButton.addEventListener("click", () => resetCalorieTotal());
cancelUpdateButton.addEventListener("click", () => cancelCalorieUpdate());
