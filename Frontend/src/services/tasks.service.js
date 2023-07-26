import BaseHttpService from './base-http.service';

export default class TasksService extends BaseHttpService {
  fetchTasks({ status, search }) {
    const params = new URLSearchParams();

    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const queryStr = params.toString();
    return this.get('tasks' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteTask(id) {
    await this.delete(`tasks/${id}`);
  }

  updateTaskStatus(id, status) {
    return this.patch(`tasks/${id}/status`, { status });
  }

  createTask(title, description) {
    return this.post(`tasks`, { title, description });
  }
}
