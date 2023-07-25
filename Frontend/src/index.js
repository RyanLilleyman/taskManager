import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TasksService from './services/tasks.service';
import TasksStore from './stores/tasks.store';
import UserStore from './stores/user.store';
import AuthService from './services/auth.service';

const services = {};
const stores = {};

stores.routerStore = new RouterStore();

services.tasksService = new TasksService(stores.routerStore);
services.authService = new AuthService();

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

const Root = (
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// Create a root container where the app will be rendered.
const rootElement = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(rootElement);

// Render the app in the root container.
rootContainer.render(Root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
