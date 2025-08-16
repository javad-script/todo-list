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
            const li = document.createElement("li");
            li.textContent = `${task.text} - ${task.priority} - ${task.dueDate}`;
            uiSelectors.taskList.appendChild(li);
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
}
export default new UiHandler();
//# sourceMappingURL=UiHandler.js.map