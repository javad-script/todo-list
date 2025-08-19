import {
  TaskCollection,
  TaskType,
  priorityClasses,
  UiSelectorsType,
} from "./task.js";

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
      const elementString: string = this.createTaskElement(task);
      uiSelectors.taskList.insertAdjacentHTML("beforeend", elementString);
    }
  }

  getInputs() {
    const { prioritySelect, titleInput, dateInput } = uiSelectors;
    if (titleInput?.closest("form")?.checkValidity()) {
      return {
        title: titleInput?.value,
        priority: prioritySelect?.value,
        date: dateInput?.value,
      };
    }
    return {
      title: null,
      priority: null,
      date: null,
    };
  }

  createTaskElement(key: TaskType): string {
    const elem: string = `
    
    <li data-id="${
      key.id
    }" class="flex items-center justify-between p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <div class="flex items-center gap-4">
                                <input type="checkbox" ${
                                  key.completed ? "checked" : ""
                                } class="h-5 w-5 text-teal-500 rounded focus:ring-teal-500">

                    <div>
                        <span class="text-gray-800 font-medium">${
                          key.text
                        }</span>
                        <div class="text-sm text-gray-500">
                            <span class="priority inline-block px-2 py-1 rounded-md ${
                              priorityClasses[key.priority]
                            }">${key.priority}</span>
                            <span>Due: ${this.formatDate(key.dueDate)}</span>
                        </div>
                    </div>
                </div>
                        <input class="text-red-500 hover:text-red-600 transition duration-200 cursor-pointer" type="button" value="Delete">
            </li>


    `;
    return elem;
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

export default new UiHandler();
