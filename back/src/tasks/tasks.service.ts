import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
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

  async getTaskById(id: string, user: User): Promise<Task> {
    const query = await this.taskRepository
      .createQueryBuilder('task')
      .where({ user })
      .andWhere('task.id = :id', { id })
      .getOne();

    if (!query) {
      throw new NotFoundException(`Task with id '${id}' not found.`);
    } else {
      return query;
    }
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where([{ user }]);

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const found = await query.getMany();
    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with id '${id}' not found.`);
    } else {
      await this.taskRepository.delete(id);
    }
  }

  async deleteAllTasks(user: User): Promise<void> {
    // Check if user has any tasks
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id })
      .getMany();

    if (tasks.length === 0) {
      throw new NotFoundException(`User: '${user.id}' has no tasks.`);
    } else {
      // Delete all tasks of the user
      await this.taskRepository
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where('userId = :userId', { userId: user.id })
        .execute();
    }
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    if (task.status !== updateTaskDto.status) {
      task.status = updateTaskDto.status;
      await this.taskRepository.save(task);
    } else {
      throw new BadRequestException();
    }
    return task;
  }
}
