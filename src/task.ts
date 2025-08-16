export type TaskCollection = Record<number, TaskType>;

export interface TaskType {
  readonly id: number;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: Date;
}

export enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}
