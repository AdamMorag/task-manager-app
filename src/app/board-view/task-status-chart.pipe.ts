import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../task/task.component';

@Pipe({
  name: 'taskStatusChart',
  pure: false
})
export class TaskStatusChartPipe implements PipeTransform {

  transform(tasks: ITask[], args?: any): number[] {
    if (!tasks)
      return;

    return [
      tasks.filter(t => t.status === 'waiting').length,
      tasks.filter(t => t.status === 'active').length,
      tasks.filter(t => t.status === 'done').length
    ];
  }

}
