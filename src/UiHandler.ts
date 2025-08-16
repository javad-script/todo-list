import { TaskCollection } from "./task.js";

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

class UiHandler {
  render(tasks: TaskCollection): void {
    if (!uiSelectors.taskList) return;
    uiSelectors.taskList.innerHTML = "";

    for (const key in tasks) {
      const task = tasks[key];
      const li = document.createElement("li");
      li.textContent = `${task.text} - ${task.priority} - ${task.dueDate}`;
      uiSelectors.taskList.appendChild(li);
    }
  }

  getInputs() {
    const { prioritySelect, titleInput, dateInput } = uiSelectors;
    return {
      title: titleInput?.value,
      priority: prioritySelect?.value,
      date: dateInput?.value,
    };
  }
}

export default new UiHandler();
