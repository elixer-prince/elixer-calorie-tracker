/*=================================================
                    HTML ELEMENTS
=================================================*/

const totalCaloriesDisplay = document.querySelector("[data-total-calories]");
const calorieInput = document.querySelector("#calorie-input");
const showCalorieUpdateButton = document.querySelector(
    "#show-calorie-update-btn"
);
const updateCalorieTotalButton = document.querySelector("#calorie-update-btn");
const resetCalorieButton = document.querySelector("#calorie-reset-btn");
const cancelUpdateButton = document.querySelector("#cancel-update-btn");

/*=================================================
                INITIALISATION
=================================================*/

totalCaloriesDisplay.textContent = JSON.parse(
    localStorage.getItem("totalCaloriesConsumedToday")
);

/*=================================================
                EVENT LISTENERS
=================================================*/

calorieInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") updateCalorieTotal();
});
showCalorieUpdateButton.addEventListener("click", () => showCalorieUpdate());
updateCalorieTotalButton.addEventListener("click", () => updateCalorieTotal());
resetCalorieButton.addEventListener("click", () => resetCalorieTotal());
cancelUpdateButton.addEventListener("click", () => cancelCalorieUpdate());

/*=================================================
                    FUNCTIONS
=================================================*/

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
        totalCaloriesDisplay.textContent = String(0);
        localStorage.setItem("totalCaloriesConsumedToday", JSON.stringify(0));
    }
}

function updateCalorieTotal() {
    const caloriesAlreadyConsumed = Number(totalCaloriesDisplay.textContent);
    const caloriesToAdd = Number(calorieInput.value);
    const totalCaloriesConsumedToday = caloriesAlreadyConsumed + caloriesToAdd;

    if (caloriesToAdd <= 0)
        return alert("Input calories must be greater than zero!");

    totalCaloriesDisplay.textContent = String(totalCaloriesConsumedToday);
    calorieInput.value = null;
    localStorage.setItem(
        "totalCaloriesConsumedToday",
        JSON.stringify(totalCaloriesConsumedToday)
    );
}
