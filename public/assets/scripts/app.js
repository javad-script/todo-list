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
}
new TaskManager();
//# sourceMappingURL=app.js.map