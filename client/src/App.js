import './App.css';
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import Axios from "axios"

function App() {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response)
    })
  }

  const validationLogin = yup.object().shape({
    email:yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório!"),
    password:yup
      .string()
      .min(3, "A senha deve ter pelo menos 3 caracteres!")
      .required("Este campo é obrigatório!"),
  })

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register",{
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response)
    })
  }

  const validationRegister = yup.object().shape({
    email:yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório!"),
    password:yup
      .string()
      .min(3, "A senha deve ter pelo menos 3 caracteres!")
      .required("Este campo é obrigatório!"),
    confirmPassword:yup.string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais!!")
      .required("Este campo é obrigatório!")
  })

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='Digite o email' />
            <ErrorMessage component='span' name='email' className='form-error' />
          </div>
          <div className='login-form-group'>
            <Field name='password' className='form-field' placeholder='Digite a senha' type='password' />
            <ErrorMessage component='span' name='password' className='form-error' />
          </div>
          <button className='button' type='submit'>Entrar</button>
        </Form>
      </Formik>
      
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationRegister}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='Digite o email' />
            <ErrorMessage component='span' name='email' className='form-error' />
          </div>
          <div className='login-form-group'>
            <Field name='password' className='form-field' placeholder='Digite a senha' type='password' />
            <ErrorMessage component='span' name='password' className='form-error' />
          </div>
          <div className='login-form-group'>
            <Field name='confirmPassword' className='form-field' placeholder='Confirme a senha' type='password' />
            <ErrorMessage component='span' name='confirmPassword' className='form-error' />
          </div>
          <button className='button' type='submit'>Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
