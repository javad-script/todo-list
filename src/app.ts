import TaskController from "./taskController.js";
import UiHandler from "./UiHandler.js";

interface UiSelectorsType {
  addTaskBtn: HTMLButtonElement | null;
  taskList: HTMLElement | null;
}

const uiSelectors: UiSelectorsType = {
  addTaskBtn: document.querySelector("[data-add-task]"),
  taskList: document.getElementById("taskList"),
};

const controller = new TaskController();

uiSelectors.addTaskBtn?.closest("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
});

uiSelectors.addTaskBtn?.addEventListener("click", () => {
  const { title, priority, date } = UiHandler.getInputs();
  if (!title || !priority || !date) return;

  controller.createTask(title || "", date || "", priority || "");
});

uiSelectors.taskList?.addEventListener("click", (e) => {
  const target = e.target as HTMLInputElement;
  const targetWrapper = target.closest("li") as HTMLElement;
  const id: number = Number(targetWrapper.getAttribute("data-id"));

  if (!(target?.tagName === "INPUT") || !id || !target) return;

  if (target.getAttribute("type") === "button") {
    controller.deleteTask(id);
  }

  if (target.getAttribute("type") === "checkbox") {
    controller.checkTasks(id, target.checked);
  }
});

document
  .querySelector("[data-filter-parent]")
  ?.addEventListener("click", (e) => {
    const dataFilter: string | undefined = UiHandler.filterButtonsHandler(e);
    controller.filterTasksManager(dataFilter ? dataFilter : null);
  });
