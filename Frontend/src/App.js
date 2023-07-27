import React from 'react';
import { Provider, observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TasksPage from './pages/tasks/TasksPage';
import CreateTaskPage from './pages/create-task/CreateTaskPage';

import TasksService from './services/tasks.service';
import TasksStore from './stores/tasks.store';

const tasksService = new TasksService(); 
const tasksStore = new TasksStore(tasksService); 

@observer
class App extends React.Component {
  render() {
    return (
      <Provider tasksStore={tasksStore}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
        </Routes>
      </Provider>
    );
  }
}

export default App;
