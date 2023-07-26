import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
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
        { search: `%${search}%`, status },
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

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = updateTaskDto.status;
    await this.taskRepository.save(task);
    return task;
  }
}
