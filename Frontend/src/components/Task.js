import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

const Task = inject('tasksStore')((props) => {
  const { tasksStore, id, title, description, status } = props;

  const deleteTask = () => {
    tasksStore.deleteTask(id);
  };

  const handleStatusChange = e => {
    tasksStore.updateTaskStatus(id, e.target.value);
  };

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          {description}
        </CardContent>
        <CardActions style={{ padding: '14px' }} disableSpacing>
          <Grid
            justifyContent="space-between" // Add it here :)
            container 
          >
            <Grid item>
              <FormControl style={{ width: '140px' }}>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <IconButton onClick={deleteTask}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </CardContainer>
  );
});

export default Task;
