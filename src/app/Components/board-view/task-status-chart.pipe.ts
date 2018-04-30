import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Objects/Task';

@Pipe({
  name: 'taskStatusChart',
  pure: false
})
export class TaskStatusChartPipe implements PipeTransform {

  transform(tasks: Task[], args?: any): number[] {
    if (!tasks)
      return;

    return [
      tasks.filter(t => t.status === 'waiting').length,
      tasks.filter(t => t.status === 'active').length,
      tasks.filter(t => t.status === 'done').length
    ];
  }

}
