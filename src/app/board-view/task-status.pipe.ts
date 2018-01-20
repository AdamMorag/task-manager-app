import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../task/task.component';

@Pipe({
  name: 'taskStatus',
  pure: false
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasks: ITask[], status: string): ITask[] {
    if (!tasks && !status)
      return;

    return tasks.filter(t => t.status === status);
  }

}
