import { getElementOrThrow } from "./helpers/utils";

export const totalCaloriesDisplay = getElementOrThrow<HTMLSpanElement>(
  "[data-total-calories]",
);

export const calorieInput =
  getElementOrThrow<HTMLInputElement>("#calorie-input");

export const showCalorieUpdateButton = getElementOrThrow<HTMLButtonElement>(
  "#show-calorie-update-btn",
);

export const updateCalorieTotalButton = getElementOrThrow<HTMLButtonElement>(
  "#calorie-update-btn",
);

export const resetCalorieButton =
  getElementOrThrow<HTMLButtonElement>("#calorie-reset-btn");

export const cancelUpdateButton =
  getElementOrThrow<HTMLButtonElement>("#cancel-update-btn");
