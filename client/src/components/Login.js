import React from 'react'
import { Formik, Form, Field } from 'formik'
import { axiosWithAuth } from '../utils/axiosWithAuth'
export default function Login(props) {
  console.log(props)
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        axiosWithAuth()
          .post('/login', { ...values })
          .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/bubblepage')
          })
          .catch(err => console.log(err))
      }}
    >
      <Form>
        <Field type='username' name='username'></Field>
        <Field type='password' name='password'></Field>
        <button type='submit' >
          Log In
                </button>
      </Form>
    </Formik>
  )
}