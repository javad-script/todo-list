const uiSelectors = {
    prioritySelect: document.querySelector("[data-set-priority]"),
    titleInput: document.querySelector("[data-set-title]"),
    dateInput: document.querySelector("[data-set-date]"),
    addTaskBtn: document.querySelector("[data-add-task]"),
};
class TaskCollection {
}
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["low"] = "low";
    TaskPriority["medium"] = "medium";
    TaskPriority["high"] = "high";
})(TaskPriority || (TaskPriority = {}));
class TaskController {
    _taskList;
    constructor() {
        this._taskList = new TaskCollection();
        this.loadFromLocal();
        uiSelectors.addTaskBtn?.addEventListener("click", () => {
            this.createTask();
        });
    }
    createTask() {
        const validated = this.validateInputs();
        const newTask = {
            id: this.totalTasks,
            completed: false,
            text: validated.title,
            priority: validated.priority,
            dueDate: validated.date,
        };
        this._taskList[this.totalTasks] = newTask;
        this.saveToLocal();
        this.displayTasks();
    }
    saveToLocal() {
        localStorage.setItem("tasks", JSON.stringify(this._taskList));
    }
    loadFromLocal() {
        const stored = localStorage.getItem("tasks");
        if (!stored)
            return;
        if (typeof stored !== "string") {
            throw new Error("LocalStorage Error: cannot read data");
        }
        this._taskList = JSON.parse(stored);
    }
    displayTasks() {
        console.log(this._taskList);
    }
    getInputs() {
        const { prioritySelect, titleInput, dateInput } = uiSelectors;
        return {
            title: titleInput?.value,
            priority: prioritySelect?.value,
            date: dateInput?.value,
        };
    }
    validateInputs() {
        const values = this.getInputs();
        const title = typeof values.title === "string" && values.title.length >= 1
            ? values.title
            : "buy coffee";
        const date = typeof values.date === "string" ? new Date(values.date) : new Date();
        console.log(date instanceof Date, date);
        const priority = typeof values.priority === "string" && values.priority.length >= 1
            ? TaskPriority[values.priority]
            : TaskPriority.low;
        return { title, date, priority };
    }
    get totalTasks() {
        return Object.keys(this._taskList).length;
    }
}
new TaskController();
//# sourceMappingURL=app.js.map