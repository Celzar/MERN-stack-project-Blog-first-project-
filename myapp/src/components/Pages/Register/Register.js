import React, { useState } from 'react';

//@import middlwares
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './Register.css'

const Register = (props) => {

    //@--states

    const [data, setdata] = useState({
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const [errores, setErrores] = useState({
        email: '',
        EmailErrorsValidated: '',
        username: '',
        password: '',
        password2: ''
    });

    const [alert, setalert] = useState(false);

    //@--middleware config
    const { register, handleSubmit, watch, errors } = useForm();

    //@--method
    const onSubmit = (e) => {
        Axios.post('http://localhost:8000/register', data)
            .then(res => {
                if (res.data.success) {
                    setalert(true)
                    setTimeout(() => {
                        props.history.push('/login')
                    }, 2000);


                }

            }).catch(error => {
                console.log(error.response.data)

                if (error.response.data.errors) {
                    if (error.response.data.errors.email) return setErrores({ EmailErrorsValidated: error.response.data.errors.email })
                    if (error.response.data.errors.username) return setErrores({ username: error.response.data.errors.username })
                    if (error.response.data.errors.password) return setErrores({ password: error.response.data.errors.password })
                    if (error.response.data.errors.password2) return setErrores({ password2: error.response.data.errors.password2 })
                }
                if (error.response.data.email) return setErrores({ email: error.response.data.email })
            })

    }

    const handleChange = (e) => {
        e.preventDefault();
        setdata({ ...data, [e.target.name]: e.target.value })

    }

    return (
        <div className='d-flex flex-column container-fluid'
            style={{
                height: '100vh',
                // background: '#ECF0F3',
            }}
        >
            <div class="alert alert-success text-center" role="alert" style={{ display: alert ? '' : 'none' }}  >
                <strong>Register Completed!</strong> Navigating to Login page.
            </div>
            <div className='container d-flex d-flex-row' style={{ width: "100%", height: '35em', 
            // background: "#ECF0F3", 
            "box-shadow": "5px 5px 11px #666666, -5px -5px 11px #ffffff", borderRadius: "50px", margin: 'auto' }} >
                <div className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                    <form className='' onSubmit={handleSubmit(onSubmit)} style={{ width: '80%' }}>
                        <h1 className='text-center font-italic font-weight-bold ' style={{ fontSize: '2rem' }}>Register</h1>
                        {/* Email */}
                        <div className="form-group">
                            <label for="Email" className='text-dark font-weight-bold'>Email address</label>
                            <input type="text" className="form-control text-dark" name="email" id='Email' aria-describedby="email" placeholder="Enter your email"
                                defaultValue={data.email} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", }} required />
                            <small class="form-text text-danger">{errores.email}</small>
                            <small class="form-text text-danger">{errores.EmailErrorsValidated}</small>
                        </div>
                        {/* Username */}
                        <div class="form-group" >
                            <label for="username" className='text-dark font-weight-bold'>Username</label>
                            <input type="username" className="form-control text-dark" name="username" id='username' placeholder="Enter your username"
                                defaultValue={data.username} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", }} required />
                            <small class="form-text text-danger">{errores.username}</small>
                        </div>
                        {/* Main password */}
                        <div class="form-group">
                            <label for="Password" className='text-dark font-weight-bold'>Password</label>
                            <input type="password" className="form-control text-dark" name="password" placeholder="Enter your password" id='Password'
                                defaultValue={data.password} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", }} required />
                            <small class="form-text text-danger">{errores.password}</small>
                        </div>
                        {/* Confirm Password */}
                        <div class="form-group">
                            <label for="Password2" className='text-dark font-weight-bold' >Confirm password</label>
                            <input type="password" className="form-control text-dark" name="password2" placeholder="Enter your password" id='Password2'
                                defaultValue={data.password2} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", outline: '0px' }} required />
                            <small class="form-text text-danger">{errores.password2}</small>
                        </div>
                        {/* <div className='text-center my-5'>
                        <button className='btn btn-danger shadow-none' type='submit'>Create Account</button>
                        <Link to='/login' style={{ textDecoration: 'none', display: 'block' }} className='text-danger '>Already Have An Account!</Link>
                    </div> */}
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-start">
                                <Link to='/login' style={{ display: 'block' }} className='text-dark font-italic font-weight-bold'>Already Have An Account!</Link>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button className='btn font-weight-bold font-italic btn-danger' type='submit'
                                    style={{ background: "", "box-shadow": "5px 5px 11px #666666, -5px -5px 11px #ffffff", borderRadius: "50px" }}
                                >Create Account</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );
}

export default Register;
