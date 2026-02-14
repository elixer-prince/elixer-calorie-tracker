import { getElementOrThrow } from "./helpers/utils";

const totalCaloriesDisplay = getElementOrThrow<HTMLSpanElement>(
  "[data-total-calories]",
);
const calorieInput = getElementOrThrow<HTMLInputElement>("#calorie-input");
const showCalorieUpdateButton = getElementOrThrow<HTMLButtonElement>(
  "#show-calorie-update-btn",
);
const updateCalorieTotalButton = getElementOrThrow<HTMLButtonElement>(
  "#calorie-update-btn",
);
const resetCalorieButton =
  getElementOrThrow<HTMLButtonElement>("#calorie-reset-btn");
const cancelUpdateButton =
  getElementOrThrow<HTMLButtonElement>("#cancel-update-btn");

/*--------------------------------------------
| VARIABLES
|---------------------------------------------
|
*/

const calorieDailyLimit = 100;

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

/*--------------------------------------------
| EVENT LISTENERS
|---------------------------------------------
|
*/

function showCalorieUpdate() {
  showCalorieUpdateButton.classList.add("hidden");
  calorieInput.classList.remove("hidden");
  updateCalorieTotalButton.classList.remove("hidden");
  resetCalorieButton.classList.remove("hidden");
  cancelUpdateButton.classList.remove("hidden");
}

function cancelCalorieUpdate() {
  showCalorieUpdateButton.classList.remove("hidden");
  calorieInput.classList.add("hidden");
  updateCalorieTotalButton.classList.add("hidden");
  resetCalorieButton.classList.add("hidden");
  cancelUpdateButton.classList.add("hidden");
}

function resetCalorieTotal() {
  const caloriesAlreadyConsumed = Number(totalCaloriesDisplay.textContent);

  if (caloriesAlreadyConsumed <= 0) return alert("You ate nothing yet!");

  if (confirm("Are you sure you want to reset your total calories?")) {
    updateCalorieDisplayColour(0, calorieDailyLimit);
    totalCaloriesDisplay.textContent = String(0);
    localStorage.setItem("totalCaloriesConsumedToday", JSON.stringify(0));
  }
}

function updateCalorieDisplayColour(
  caloriesAlreadyConsumed: number,
  calorieDailyLimit: number,
) {
  if (caloriesAlreadyConsumed < calorieDailyLimit) {
    totalCaloriesDisplay.classList.add("deficit");
    totalCaloriesDisplay.classList.remove("sufficient");
    return;
  }

  totalCaloriesDisplay.classList.add("sufficient");
  totalCaloriesDisplay.classList.remove("deficit");
}

function updateCalorieTotal() {
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
}
