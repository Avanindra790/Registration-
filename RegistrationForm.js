import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Formikcontrol from './FormikContainer';

function RegistrationForm() {
  const options = [
    { key: 'Email', value: 'emailmoc' },
    { key: 'Telephone', value: 'telephonemoc' }
  ];

  const initialValues = {
    email: '',
    password: '',
    confirmpassword: '',
    modeofContact: '',
    phone: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    modeofContact: Yup.string().required('Required'),
    phone: Yup.string().when('modeofContact', {
      is: 'telephonemoc',
      then: Yup.string().required('Required'),
      otherwise: Yup.string()
    })
  });

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form>
          <Formikcontrol
            control='input'
            type='email'
            label='Email'
            name='email'
          />
          <Formikcontrol
            control='input'
            type='password'
            label='Password'
            name='password'
          />
          <Formikcontrol
            control='input'
            type='password'
            label='Confirm Password'
            name='confirmpassword'
          />
          <Formikcontrol
            control='radio'
            label='Mode of Contact'
            name='modeofContact'
            options={options}
          />
          <Formikcontrol
            control='input'
            type='text'
            label='Phone number'
            name='phone'
          />
          <button type='submit' disabled={!formik.isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
