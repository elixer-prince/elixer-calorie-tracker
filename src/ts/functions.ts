import "./variables";
import {
  totalCaloriesDisplay,
  showCalorieUpdateButton,
  updateCalorieTotalButton,
  resetCalorieButton,
  cancelUpdateButton,
  calorieInput,
} from "./elements";

/*--------------------------------------------
| FUNCTIONS
|---------------------------------------------
|
*/

export const showCalorieUpdate = () => {
  showCalorieUpdateButton.classList.add("hidden");
  calorieInput.classList.remove("hidden");
  updateCalorieTotalButton.classList.remove("hidden");
  resetCalorieButton.classList.remove("hidden");
  cancelUpdateButton.classList.remove("hidden");
};

export const cancelCalorieUpdate = () => {
  showCalorieUpdateButton.classList.remove("hidden");
  calorieInput.classList.add("hidden");
  updateCalorieTotalButton.classList.add("hidden");
  resetCalorieButton.classList.add("hidden");
  cancelUpdateButton.classList.add("hidden");
};

export const resetCalorieTotal = () => {
  const caloriesAlreadyConsumed = Number(totalCaloriesDisplay.textContent);

  if (caloriesAlreadyConsumed <= 0) return alert("You ate nothing yet!");

  if (confirm("Are you sure you want to reset your total calories?")) {
    updateCalorieDisplayColour(0, calorieDailyLimit);
    totalCaloriesDisplay.textContent = String(0);
    localStorage.setItem("totalCaloriesConsumedToday", JSON.stringify(0));
  }
};

export const updateCalorieDisplayColour = (
  caloriesAlreadyConsumed: number,
  calorieDailyLimit: number,
) => {
  if (caloriesAlreadyConsumed < calorieDailyLimit) {
    totalCaloriesDisplay.classList.add("deficit");
    totalCaloriesDisplay.classList.remove("sufficient");
    return;
  }

  totalCaloriesDisplay.classList.add("sufficient");
  totalCaloriesDisplay.classList.remove("deficit");
};

export const updateCalorieTotal = () => {
  let caloriesAlreadyConsumed = Number(totalCaloriesDisplay.textContent);
  const caloriesToAdd = Number(calorieInput.value);
  const totalCaloriesConsumedToday = caloriesAlreadyConsumed + caloriesToAdd;

  if (caloriesToAdd <= 0)
    return alert("Input calories must be greater than zero!");

  totalCaloriesDisplay.textContent = String(totalCaloriesConsumedToday);
  caloriesAlreadyConsumed = Number(totalCaloriesDisplay.textContent);

  updateCalorieDisplayColour(caloriesAlreadyConsumed, calorieDailyLimit);
  calorieInput.value = "";
  localStorage.setItem(
    "totalCaloriesConsumedToday",
    JSON.stringify(totalCaloriesConsumedToday),
  );
};
