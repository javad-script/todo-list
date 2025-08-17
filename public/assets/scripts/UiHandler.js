import { priorityClasses } from "./task.js";
const uiSelectors = {
    prioritySelect: document.querySelector("[data-set-priority]"),
    titleInput: document.querySelector("[data-set-title]"),
    dateInput: document.querySelector("[data-set-date]"),
    addTaskBtn: document.querySelector("[data-add-task]"),
    taskList: document.getElementById("taskList"),
};
class UiHandler {
    render(tasks) {
        if (!uiSelectors.taskList)
            return;
        uiSelectors.taskList.innerHTML = "";
        for (const key in tasks) {
            const task = tasks[key];
            const elementString = this.createTaskElement(task);
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
    createTaskElement(key) {
        const elem = `
    
    <li class="flex items-center justify-between p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <div class="flex items-center gap-4">
                    <input type="checkbox" class="h-5 w-5 text-teal-500 rounded focus:ring-teal-500">
                    <div>
                        <span class="text-gray-800 font-medium">${key.text}</span>
                        <div class="text-sm text-gray-500">
                            <span class="priority inline-block px-2 py-1 rounded-md ${priorityClasses[key.priority]}">${key.priority}</span>
                            <span>Due: ${this.formatDate(key.dueDate)}</span>
                        </div>
                    </div>
                </div>
                <button data-id="${key.id}" class="text-red-500 hover:text-red-600 transition duration-200">Delete</button>
            </li>


    `;
        return elem;
    }
    formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
}
export default new UiHandler();
//# sourceMappingURL=UiHandler.js.map