export type Todo = {
  id: number,
  task: string,
  priority: "high" | "medium" | "low",
  progress: number, 
}