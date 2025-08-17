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
        return newTask;
    }
    getTasks() {
        return this._taskList;
    }
    saveToLocal() {
        localStorage.setItem("tasks", JSON.stringify(this._taskList));
        UiHandler.render(this._taskList);
    }
    loadFromLocal() {
        const stored = localStorage.getItem("tasks");
        this._taskList = stored ? JSON.parse(stored) : {};
        UiHandler.render(this._taskList);
    }
    deleteTask(taskId) {
        delete this._taskList[taskId];
        this.saveToLocal();
    }
}
export default TaskController;
//# sourceMappingURL=taskController.js.map