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
}

new TaskManager();
