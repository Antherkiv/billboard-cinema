import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form, InputGroup, Input, InputGroupAddon } from 'reactstrap';

const initialValues = {
  email: '',
  password: ''
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validation = ({ email, password }) => {
  const errors = {};

  if (typeof fullName === 'undefined') {
    errors.fullName = 'Es requerido';
  }

  if (typeof email === 'undefined') {
    errors.email = 'Es requerido';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'No es un correo electronico';
  }

  if (typeof password === 'undefined') {
    errors.password = 'Es requerido';
  }
  return errors;
};

export const LoginFormRender = ({
  values: { email, password },
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
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={email}
        invalid={!!(touched.email && emailErr)}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={password}
        invalid={!!(touched.password && passwordErr)}
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

const Login = ({ className }) => (
  <Formik
    initialValues={initialValues}
    validate={validation}
    render={LoginFormRender}
  />
);

Login.propTypes = {
  className: PropTypes.string
};

export default Login;
