import TaskController from "./taskController.js";
import UiHandler from "./UiHandler.js";

interface UiSelectorsType {
  prioritySelect: HTMLSelectElement | null;
  titleInput: HTMLInputElement | null;
  dateInput: HTMLInputElement | null;
  addTaskBtn: HTMLButtonElement | null;
  taskList: HTMLElement | null;
}

const uiSelectors: UiSelectorsType = {
  prioritySelect: document.querySelector("[data-set-priority]"),
  titleInput: document.querySelector("[data-set-title]"),
  dateInput: document.querySelector("[data-set-date]"),
  addTaskBtn: document.querySelector("[data-add-task]"),
  taskList: document.getElementById("taskList"),
};

const controller = new TaskController();

uiSelectors.addTaskBtn?.addEventListener("click", () => {
  const { title, priority, date } = UiHandler.getInputs();
  if (!title || !priority || !date) return;

  controller.createTask(title || "", date || "", priority || "");
  UiHandler.render(controller.getTasks());
});

UiHandler.render(controller.getTasks());
