import React from 'react';
import axios from 'axios';

import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form, InputGroup, Input, InputGroupAddon } from 'reactstrap';

import Api from '../../Api';
import { actions } from '../../store';
import { getUserName } from '../../tools';

const initialValues = {
  email: '',
  password: ''
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validation = ({ loginEmail, loginPassword }) => {
  const errors = {};

  if (typeof loginEmail === 'undefined') {
    errors.loginEmail = 'Es requerido';
  } else if (!EMAIL_REGEX.test(loginEmail)) {
    errors.loginEmail = 'No es un correo electronico';
  }

  if (typeof loginPassword === 'undefined') {
    errors.loginPassword = 'Es requerido';
  }
  return errors;
};

const onSubmit = (authBaseURL, alert, setAuthenticated) => (
  { loginEmail: email, loginPassword: password },
  { setSubmitting, setErrors }
) =>
  axios(`${authBaseURL}/token`, {
    method: 'post',
    data: {
      email,
      password
    },
    withCredentials: true
  })
    .then(() => {
      alert.success('El usuario se ha logeado correctamente');
      setAuthenticated(true);
      getUserName();
      setSubmitting(false);
    })
    .catch(({ response: { data: { description } } }) => {
      alert.error(description);
      setSubmitting(false);
    });

export const LoginFormRender = ({
  values: { loginEmail, loginPassword },
  errors: { email: emailErr, password: passwordErr },
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Form onSubmit={handleSubmit} inline className="my-1">
    <InputGroup size="sm">
      <Input
        placeholder="e-Mail"
        type="email"
        name="loginEmail"
        onChange={handleChange}
        onBlur={handleBlur}
        value={loginEmail}
        invalid={!!(touched.loginEmail && emailErr)}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        name="loginPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        value={loginPassword}
        invalid={!!(touched.loginPassword && passwordErr)}
      />

      <InputGroupAddon addonType="append">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="float-sm-right"
          size="sm"
        >
          Ingresar
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </Form>
);

LoginFormRender.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
};

const Login = withAlert(({ className, alert }) => (
  <Api.Consumer>
    {value => (
      <Formik
        initialValues={initialValues}
        validate={validation}
        render={LoginFormRender}
        onSubmit={onSubmit(value.authBaseURL, alert, actions.setAuthenticated)}
      />
    )}
  </Api.Consumer>
));

Login.propTypes = {
  className: PropTypes.string
};

export default Login;
