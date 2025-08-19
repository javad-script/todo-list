import TaskController from "./taskController.js";
import UiHandler from "./UiHandler.js";
const uiSelectors = {
    prioritySelect: document.querySelector("[data-set-priority]"),
    titleInput: document.querySelector("[data-set-title]"),
    dateInput: document.querySelector("[data-set-date]"),
    addTaskBtn: document.querySelector("[data-add-task]"),
    taskList: document.getElementById("taskList"),
};
const controller = new TaskController();
uiSelectors.addTaskBtn?.addEventListener("click", () => {
    uiSelectors.addTaskBtn?.closest("form")?.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    const { title, priority, date } = UiHandler.getInputs();
    if (!title || !priority || !date)
        return;
    controller.createTask(title || "", date || "", priority || "");
});
UiHandler.render(controller.getTasks());
uiSelectors.taskList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target?.tagName === "BUTTON") {
        const id = Number(target.getAttribute("data-id"));
        controller.deleteTask(id);
    }
    else if (target?.tagName === "INPUT" &&
        target.getAttribute("type") === "checkbox") {
        const target = e.target;
        const id = Number(target.getAttribute("data-id"));
        controller.checkTasks(id, target.checked);
    }
});
//# sourceMappingURL=app.js.map