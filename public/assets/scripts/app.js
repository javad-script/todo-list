const setterElements = {
    prioritySetter: document.querySelector("[data-set-priority]"),
    titleSetter: document.querySelector("[data-set-title]"),
    dateSetter: document.querySelector("[data-set-date]"),
    addTask: document.querySelector("[data-add-task]"),
};
class AllTasks {
}
var Priority;
(function (Priority) {
    Priority["low"] = "low";
    Priority["medium"] = "medium";
    Priority["high"] = "high";
})(Priority || (Priority = {}));
class TaskManager {
    _tasks;
    constructor() {
        this._tasks = new AllTasks();
        setterElements.addTask?.addEventListener("click", () => {
        });
    }
    addNewTask() {
        const data = this.validateSetterValues();
        const cratedTask = {
            id: this.tasksLength,
            completed: false,
            text: data.title,
            priority: data.priority,
            dueDate: data.date,
        };
        this._tasks[this.tasksLength] = cratedTask;
        this.renderTasks();
    }
    renderTasks() {
        console.log(this._tasks);
    }
    getSetterValues() {
        const { prioritySetter, titleSetter, dateSetter } = setterElements;
        const values = {
            title: titleSetter?.value,
            priority: prioritySetter?.value,
            date: dateSetter?.value,
        };
        return values;
    }
    validateSetterValues() {
        const values = this.getSetterValues();
        const title = typeof values.title === "string" && values.title.length >= 1
            ? values.title
            : "buy coffee";
        const date = typeof values.date === "string" ? new Date(values.date) : new Date();
        console.log(date instanceof Date, date);
        const priority = typeof values.priority === "string" && values.priority.length >= 1
            ? Priority[values.priority]
            : Priority.low;
        return {
            title: title,
            date: date,
            priority: priority,
        };
    }
    get tasksLength() {
        return Object.keys(this._tasks).length;
    }
}
new TaskManager();
//# sourceMappingURL=app.js.map