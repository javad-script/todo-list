const setterElements: SetterElementsInterface = {
  prioritySetter: document.querySelector("[data-set-priority]"),
  titleSetter: document.querySelector("[data-set-title]"),
  dateSetter: document.querySelector("[data-set-date]"),
  addTask: document.querySelector("[data-add-task]"),
};
interface SetterElementsInterface {
  prioritySetter: HTMLSelectElement | null;
  titleSetter: HTMLInputElement | null;
  dateSetter: HTMLInputElement | null;
  addTask: HTMLInputElement | null;
}

class AllTasks {
  [allTasks: number]: Task;
}

interface Task {
  readonly id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate: Date;
}

enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

class TaskManager {
  protected _tasks: any;
  constructor() {
    this._tasks = new AllTasks();

    setterElements.addTask?.addEventListener("click", () => {
      // this.addNewTask();
    });
  }

  addNewTask(): void {
    const data = this.validateSetterValues();
    const cratedTask: Task = {
      id: this.tasksLength,
      completed: false,
      text: data.title,
      priority: data.priority,
      dueDate: data.date,
    };
    this._tasks[this.tasksLength] = cratedTask;

    this.renderTasks();
  }

  renderTasks(): void {
    console.log(this._tasks);
  }
  getSetterValues() {
    const { prioritySetter, titleSetter, dateSetter } = setterElements;
    const values = {
      title: titleSetter?.value,
      priority: prioritySetter?.value,
      date: dateSetter?.value,
    };
    return values;
  }

  validateSetterValues() {
    const values = this.getSetterValues();
    const title: string =
      typeof values.title === "string" && values.title.length >= 1
        ? values.title
        : "buy coffee";
    const date: Date =
      typeof values.date === "string" ? new Date(values.date) : new Date();
    console.log(date instanceof Date, date);

    const priority: Priority =
      typeof values.priority === "string" && values.priority.length >= 1
        ? Priority[values.priority as Priority]
        : Priority.low;

    return {
      title: title,
      date: date,
      priority: priority,
    };
  }
  get tasksLength(): number {
    return Object.keys(this._tasks).length;
  }
}

new TaskManager();
