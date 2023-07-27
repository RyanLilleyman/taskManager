import React, { useState } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';


const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;
const CreateTaskPage = inject('tasksStore')(observer((props) => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmitTask = async () => {
    try {
      console.log('Task info:', title, description); // add this line
      await props.tasksStore.createTask({title, description});
      navigate('/tasks');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrorMessage(errorMessage);
    }
  };
  

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        { errorMessage && <ErrorMessage message={errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            minRows="8"
            margin="normal"
            variant="outlined"
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
      </FormContainer>
    </FormWrapper>
  );
}));

export default CreateTaskPage;