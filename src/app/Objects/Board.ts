export interface Board {
  title: string,
  startDate: Date,
  endDate: Date,
  boardMembers: any,
  tasks: any,
  // Once we have authntication get the real values
  boardOwner: {
    uid: string,
    name: string
  }
}
