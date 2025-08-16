import { TaskCollection, TaskType, TaskPriority } from "./task.js";

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
  }
}

export default TaskController;
