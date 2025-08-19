import { TaskCollection, TaskType, TaskPriority } from "./task.js";
import UiHandler from "./UiHandler.js";

class TaskController {
  protected _taskList: TaskCollection = {};

  constructor() {
    this.loadFromLocal();
  }

  createTask(title: string, date: string, priority: string): TaskType {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const newTask: TaskType = {
      id,
      completed: false,
      text: title || "buy coffee",
      dueDate: typeof date === "string" ? new Date(date) : new Date(),
      priority:
        TaskPriority[priority as keyof typeof TaskPriority] || TaskPriority.low,
    };
    this._taskList[id] = newTask;
    this.saveToLocal();
    this.updateUi();
    return newTask;
  }

  getTasks(): TaskCollection {
    return this._taskList;
  }

  saveToLocal(): void {
    localStorage.setItem("tasks", JSON.stringify(this._taskList));
  }

  loadFromLocal(): void {
    const stored = localStorage.getItem("tasks");
    this._taskList = stored ? JSON.parse(stored) : {};
    this.updateUi();
  }

  deleteTask(taskId: number) {
    delete this._taskList[taskId];
    this.saveToLocal();
    this.updateUi();
  }

  checkTasks(taskId: number, isComplete: boolean) {
    this._taskList[taskId].completed = isComplete;
    this.saveToLocal();
  }
  updateUi(): void {
    UiHandler.render(this._taskList);
  }
}

export default TaskController;
