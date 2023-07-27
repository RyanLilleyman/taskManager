import React, { useState } from 'react';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styled from 'styled-components';
import './SignUpPage.scss';
import { inject, observer } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignUpPage = inject('userStore')(observer((props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to control visibility of the password
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await props.userStore.signup(username, password);
      navigate('/signin');
    } catch (error) {
      const errMsg = error.response.data.message;
      setErrorMessage(errMsg);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fullscreen-wrapper">
      <FormContainer>
        <Heading>Join us!</Heading>
        <p>Start managing tasks easily.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div>
          <FormField
            id="outlined-name"
            label="Username"
            margin="dense"
            variant="outlined"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Password"
            margin="dense"
            variant="outlined"
            type={showPassword ? 'text' : 'password'} // Show password in plain text if showPassword is true
            onChange={e => setPassword(e.target.value)}
            InputProps={{ // Adding the show/hide password button
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case letter, and one number OR special character.
        </p>
        <hr/>
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            SIGN UP
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}));

export default SignUpPage;
