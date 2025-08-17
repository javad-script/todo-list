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

export const priorityClasses: Record<string, string> = {
  high: "bg-red-200 text-red-800",
  medium: "bg-yellow-200 text-yellow-800",
  low: "bg-green-200 text-green-800",
};
