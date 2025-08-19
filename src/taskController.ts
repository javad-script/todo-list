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
    console.log(this._taskList);

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
  updateUi(tasklist: TaskCollection = this._taskList): void {
    UiHandler.render(tasklist);
  }

  filterTasksManager(filterType: string | null) {
    if (filterType === "all") {
      this.updateUi();
      return;
    }

    if (TaskPriority[filterType as keyof typeof TaskPriority]) {
      const filterBy = TaskPriority[filterType as keyof typeof TaskPriority];
      this.filterByPriority(filterBy);
      return;
    }
    this.filterByCompletion(filterType);
  }
  filterByPriority(filterBy: TaskPriority) {
    const filteredByPriority = Object.entries(this._taskList).filter(
      (data) => data[1].priority === filterBy
    );
    let convertedToObject: TaskCollection = {};
    for (const item of filteredByPriority) {
      let id: number = item[1].id;
      convertedToObject[id] = item[1];
    }
    this.updateUi(convertedToObject);
  }
  filterByCompletion(filterBy: string | null) {
    const completion: boolean | null =
      filterBy === "completed" ? true : filterBy === "pending" ? false : null;

    const filteredByCompletion = Object.entries(this._taskList).filter(
      ([_, task]) => task.completed === completion
    );

    let convertedToObject: TaskCollection = {};
    for (const item of filteredByCompletion) {
      let id: number = item[1].id;
      convertedToObject[id] = item[1];
    }
    this.updateUi(convertedToObject);
  }
}

export default TaskController;
