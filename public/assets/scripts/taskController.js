import { TaskPriority } from "./task.js";
import UiHandler from "./UiHandler.js";
class TaskController {
    _taskList = {};
    constructor() {
        this.loadFromLocal();
    }
    createTask(title, date, priority) {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        const newTask = {
            id,
            completed: false,
            text: title || "buy coffee",
            dueDate: typeof date === "string" ? new Date(date) : new Date(),
            priority: TaskPriority[priority] || TaskPriority.low,
        };
        this._taskList[id] = newTask;
        this.saveToLocal();
        this.updateUi();
        return newTask;
    }
    getTasks() {
        return this._taskList;
    }
    saveToLocal() {
        localStorage.setItem("tasks", JSON.stringify(this._taskList));
    }
    loadFromLocal() {
        const stored = localStorage.getItem("tasks");
        this._taskList = stored ? JSON.parse(stored) : {};
        this.updateUi();
    }
    deleteTask(taskId) {
        delete this._taskList[taskId];
        this.saveToLocal();
        this.updateUi();
    }
    checkTasks(taskId, isComplete) {
        this._taskList[taskId].completed = isComplete;
        this.saveToLocal();
    }
    updateUi() {
        UiHandler.render(this._taskList);
    }
}
export default TaskController;
//# sourceMappingURL=taskController.js.map