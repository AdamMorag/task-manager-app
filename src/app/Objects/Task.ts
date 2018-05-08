export interface Task {
  taskId: string,
  title: string,
  boardName: string,
  boardId: string,
  owner: {
    uid: string,
    name: string,
    image: string,
    color: string
  },
  status: string,
  overallTime: number,
  remainingTime: number
}
