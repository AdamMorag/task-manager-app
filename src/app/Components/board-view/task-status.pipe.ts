import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Objects/Task';

@Pipe({
  name: 'taskStatus',
  pure: false
})
export class TaskStatusPipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    if (!tasks && !status)
      return;

    return tasks.filter(t => t.status === status);
  }

}
