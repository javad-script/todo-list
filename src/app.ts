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
  addTaskBtn: HTMLButtonElement | null;
}

type TaskCollection = Record<number, TaskType>;

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
  protected _taskList: TaskCollection;

  constructor() {
    this.loadFromLocal();

    uiSelectors.addTaskBtn?.addEventListener("click", () => {
      this.createTask();
    });
  }

  createTask(): void {
    const validated = this.validateInputs();
    if (!validated) return;
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const newTask: TaskType = {
      id: id,
      completed: false,
      text: validated.title,
      priority: validated.priority,
      dueDate: validated.date,
    };
    this._taskList[id] = newTask;
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

    const storedObject: TaskCollection = JSON.parse(stored);

    this._taskList = storedObject;
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
      typeof values.date === "string" && !isNaN(new Date(values.date).getTime())
        ? new Date(values.date)
        : new Date();

    values.priority = values.priority?.toLocaleLowerCase();
    const priority: TaskPriority =
      typeof values.priority === "string" && values.priority.length >= 1
        ? TaskPriority[values.priority as TaskPriority]
        : TaskPriority.low;

    return { title, date, priority };
  }
}

new TaskController();
