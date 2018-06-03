export interface Board {
  title: string,
  startDate: Date,
  endDate: Date,
  categoryId: Number;
  boardMembers: any,
  tasks: any,
  // Once we have authntication get the real values
  boardOwner: {
    uid: string,
    name: string
  }
}
