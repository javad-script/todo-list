const uiSelectors: UiSelectorsType = {
  prioritySelect: document.querySelector("[data-set-priority]"),
  titleInput: document.querySelector("[data-set-title]"),
  dateInput: document.querySelector("[data-set-date]"),
  addTaskBtn: document.querySelector("[data-add-task]"),
};

interface UiSelectorsType {
  prioritySelect: HTMLSelectElement | null;
  titleInput: HTMLInputElement | null;
  dateInput: HTMLInputElement | null;
  addTaskBtn: HTMLInputElement | null;
}

class TaskCollection {
  [index: number]: TaskType;
}

interface TaskType {
  readonly id: number;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: Date;
}

enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}

class TaskController {
  protected _taskList: any;

  constructor() {
    this._taskList = new TaskCollection();
    this.loadFromLocal();

    uiSelectors.addTaskBtn?.addEventListener("click", () => {
      this.createTask();
    });
  }

  createTask(): void {
    const validated = this.validateInputs();
    const newTask: TaskType = {
      id: this.totalTasks,
      completed: false,
      text: validated.title,
      priority: validated.priority,
      dueDate: validated.date,
    };
    this._taskList[this.totalTasks] = newTask;
    this.saveToLocal();
    this.displayTasks();
  }

  saveToLocal(): void {
    localStorage.setItem("tasks", JSON.stringify(this._taskList));
  }

  loadFromLocal() {
    const stored: string | null = localStorage.getItem("tasks");
    if (!stored) return;
    if (typeof stored !== "string") {
      throw new Error("LocalStorage Error: cannot read data");
    }
    this._taskList = JSON.parse(stored);
  }

  displayTasks(): void {
    console.log(this._taskList);
  }

  getInputs() {
    const { prioritySelect, titleInput, dateInput } = uiSelectors;
    return {
      title: titleInput?.value,
      priority: prioritySelect?.value,
      date: dateInput?.value,
    };
  }

  validateInputs() {
    const values = this.getInputs();
    const title: string =
      typeof values.title === "string" && values.title.length >= 1
        ? values.title
        : "buy coffee";
    const date: Date =
      typeof values.date === "string" ? new Date(values.date) : new Date();
    console.log(date instanceof Date, date);

    const priority: TaskPriority =
      typeof values.priority === "string" && values.priority.length >= 1
        ? TaskPriority[values.priority as TaskPriority]
        : TaskPriority.low;

    return { title, date, priority };
  }

  get totalTasks(): number {
    return Object.keys(this._taskList).length;
  }
}

new TaskController();
