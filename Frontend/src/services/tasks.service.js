import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class TasksService extends BaseHttpService {
  fetchTasks({ status, search }) {
    const queryObj = {};
  
    if (status) {
      queryObj.status = status;
    }
  
    if (search && search.length > 0) {
      queryObj.search = search;
    }
  
    const queryStr = queryString.stringify(queryObj);
  
    console.log('Fetch tasks with filters:', queryStr); // added log
  
    return this.get('tasks' + (queryStr ? `?${queryStr}` : '')).then(result => {
      console.log('Fetched tasks:', result);
      return result;
    });
  }
  
  async deleteTask(id) {
    console.log('Delete task:', id); // added log
    await this.delete(`tasks/${id}`);
  }

  updateTaskStatus(id, status) {
    console.log('Update task status:', id, status); // added log
    return this.patch(`tasks/${id}/status`, { status });
  }

  async createTask(title, description) {
    console.log('Task info in service:', title, description); // add this line
    return await this.post('tasks', { title, description });
  }
  
}
