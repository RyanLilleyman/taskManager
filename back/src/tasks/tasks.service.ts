import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with id '${id}' not found.`);
    }
    return found;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search OR task.status = :status',
        { search: `%%`, status },
      );
    }

    const found = await query.getMany();
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id '${id}' not found.`);
    }
  }

  async deleteAllTasks(): Promise<void> {
    await this.taskRepository.delete({});
  }
}
// getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//   const { search, status } = filterDto;

//   let tasks = this.getAllTasks();
//   if (status) {
//     tasks = tasks.filter((task) => task.status === status);
//   }
//   if (search) {
//     return tasks.filter((task) => {
//       if (
//         task.title.toUpperCase().includes(search) ||
//         task.description.toLowerCase().includes(search)
//       ) {
//         return true;
//       }
//       return false;
//     });
//   }
//   return tasks;
// }
// createTask(createTaskDto: CreateTaskDto): Task {
//   const { title, description } = createTaskDto;

//   const task: Task = {
//     id: uuid(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };

//   this.tasks.push(task);

//   return task;
// }
// private tasks: Task[] = [];

// getAllTasks(): Task[] {
//   return this.tasks;
// }

// getTasksById(id: string): Task {
//   const found = this.tasks.find((task) => task.id === id);
//   if (!found) {
//     throw new NotFoundException(`Task with '${id}' not found.`);
//   }
//   return found;
// }

// deleteTasksById(id: string): void {
//   const found = this.getTasksById(id);
//   this.tasks = this.tasks.filter((task) => task.id !== found.id);
// }

// updateTask(id: string, updateTaskDto: UpdateTaskStatusDto): Task {
//   const { status } = updateTaskDto;

//   const toUpdateTask = this.getTasksById(id);
//   toUpdateTask.status = status;

//   this.deleteTasksById(id);
//   this.tasks.push(toUpdateTask);

//   return toUpdateTask;
// }
