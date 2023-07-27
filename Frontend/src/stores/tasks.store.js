import { makeAutoObservable, action } from 'mobx';

class TasksStore {
  tasks = [];  // Tasks array
  filters = {};  // Filters object
  
  constructor(tasksService) {
    makeAutoObservable(this, {
      deleteTask: action.bound,
      updateTaskStatus: action.bound,
      setTasks: action.bound,
      setFilters: action.bound,
    });
    this.tasksService = tasksService;
  }
  
  async fetchTasks() {
    const tasks = await this.tasksService.fetchTasks({});
    console.log('Tasks fetched:', tasks);
    if (!Array.isArray(tasks)) {
      console.error('fetchTasks should return an array, got:', tasks);
      return;
    }
    this.setTasks(tasks);
    console.log(`Fetched tasks: Array(${tasks.length})`);
  }
  async fetchTasksWithFilters(filter) {
    console.log('Filter:', filter);
    const tasks = await this.tasksService.fetchTasks(filter);
    console.log('Tasks fetched with filter:', tasks);
    if (!Array.isArray(tasks)) {
      console.error('fetchTasksWithFilters should return an array, got:', tasks);
      return;
    }
    this.setTasks(tasks);
    this.setFilters(filter);
    console.log(`Fetched tasks: Array(${tasks.length})`);
  }

  setTasks(tasks) {
    console.log('Tasks before setting:', this.tasks); // Log current tasks
    console.log('Setting tasks with:', tasks); // Log new tasks
    this.tasks = tasks;
    console.log('Tasks after setting:', this.tasks); // Log updated tasks
    console.log('Set tasks: Array(' + tasks.length + ')');
  }

  setFilters(filters) {
    this.filters = filters;
    console.log('Filters changed:', filters);
  }

  async createTask(taskData) {
    console.log('TaskData in store:', taskData); // add this line
    const task = await this.tasksService.createTask(taskData.title, taskData.description);
    this.tasks.push(task);
    console.log('Created task:', task);
  }
  

  async deleteTask(taskId) {
    await this.tasksService.deleteTask(taskId);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  async updateTaskStatus(taskId, status) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      await this.tasksService.updateTaskStatus(taskId, status);
      task.status = status;
    }
  }

  resetTasks() {
    this.tasks = []; // Reset the tasks to an empty array
  }
}

export default TasksStore;
