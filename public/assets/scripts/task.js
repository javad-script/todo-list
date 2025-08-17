export var TaskPriority;
(function (TaskPriority) {
    TaskPriority["low"] = "low";
    TaskPriority["medium"] = "medium";
    TaskPriority["high"] = "high";
})(TaskPriority || (TaskPriority = {}));
export const priorityClasses = {
    high: "bg-red-200 text-red-800",
    medium: "bg-yellow-200 text-yellow-800",
    low: "bg-green-200 text-green-800",
};
//# sourceMappingURL=task.js.map