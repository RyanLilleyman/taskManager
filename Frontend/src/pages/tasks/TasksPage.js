import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import Task from '../../components/Task';
import TasksFilters from '../../components/TasksFilters';
import { useNavigate } from 'react-router-dom';


const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: #edf4ff;
  }
`;
const TasksPage = inject('tasksStore', 'userStore')(observer((props) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    props.tasksStore.fetchTasks();
  }, [props.tasksStore]);

  const handleSignOut = () => {
    props.userStore.signout();
    props.tasksStore.resetTasks();
    navigate('/signin');
  };

  const renderTasks = () => {
    if (!props.tasksStore.tasks.length) {
      return <EmptyTasksPlaceholder>No tasks available. Create one?</EmptyTasksPlaceholder>
    }

    return props.tasksStore.tasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    ));
  };

  return (
    <TasksWrapper>
      <TasksHeader>
        <Title>Get things done.</Title>

        <CreateButtonContainer>
          <Fab
            variant="extended"
            onClick={() => { navigate('/tasks/create'); }}
          >
            <AddIcon />
            Create Task
          </Fab>

          <SignOutIconContainer>
            <IconButton onClick={handleSignOut}>
              <SignOutIcon className="signOutIcon" />
            </IconButton>
          </SignOutIconContainer>
        </CreateButtonContainer>
      </TasksHeader>

      <TasksFilters />

      <TasksContainer>
        {renderTasks()}
      </TasksContainer>
    </TasksWrapper>
  );
}));

export default TasksPage;