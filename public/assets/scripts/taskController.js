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
        console.log(this._taskList);
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
    updateUi(tasklist = this._taskList) {
        UiHandler.render(tasklist);
    }
    filterTasksManager(filterType) {
        if (filterType === "all") {
            this.updateUi();
            return;
        }
        if (TaskPriority[filterType]) {
            const filterBy = TaskPriority[filterType];
            this.filterByPriority(filterBy);
            return;
        }
        this.filterByCompletion(filterType);
    }
    filterByPriority(filterBy) {
        const filteredByPriority = Object.entries(this._taskList).filter((data) => data[1].priority === filterBy);
        let convertedToObject = {};
        for (const item of filteredByPriority) {
            let id = item[1].id;
            convertedToObject[id] = item[1];
        }
        this.updateUi(convertedToObject);
    }
    filterByCompletion(filterBy) {
        const completion = filterBy === "completed" ? true : filterBy === "pending" ? false : null;
        const filteredByCompletion = Object.entries(this._taskList).filter(([_, task]) => task.completed === completion);
        let convertedToObject = {};
        for (const item of filteredByCompletion) {
            let id = item[1].id;
            convertedToObject[id] = item[1];
        }
        this.updateUi(convertedToObject);
    }
}
export default TaskController;
//# sourceMappingURL=taskController.js.map