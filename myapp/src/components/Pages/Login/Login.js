import React, { useState, useEffect } from 'react';
import './Login.css'

//@import middlwares
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'


import setAuthToken from '../../../store/ultilities/setAuthToken'


// @import actions
import { loginUser } from '../../../store/Actions/authAction'


const Login = (props) => {

    //@--states
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({});

    const [alert, setalert] = useState(false);
    //@--middleware config
    const { register, handleSubmit, watch, errors } = useForm();
    //@--method
    const onSubmit = () => {
        // e.preventDefault();

        const userData = {
            email: data.email,
            password: data.password
        }
        // console.log(userData)


        // console.log(props.loginUser(userData))

        Axios.post('http://localhost:8000/login', userData)
            .then(res => {
                if (res.data.success) {

                    const { token } = res.data
                    localStorage.setItem("jwtToken", token)
                    setAuthToken(token)
                    const decoded = jwt_decode(token)
                    props.dispatch({
                        type: 'SET_CURRENT-USER',
                        payload: decoded
                    })
                }
                setalert(true)
                setTimeout(() => {
                    props.history.push('/home')
                }, 2000)


            }).catch(err => {
                console.log(err.response.data)
            })


    }


    const handleChange = (e) => {
        e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
    }


    useEffect(() => {

        if (props.auth.isAuthentication) {
            props.history.push('/home')
        }
        // console.log(props.auth)

        if (props.errors) {
            setError({ error: props.errors })
        }

        // if (props.auth.isAuthenticated) {
        //     props.history.push("/dashboard");
        // }

    }, [props.auth, props.errors])


    return (

        // <div className='background'>
        //     <div className='container' style={{ width: "50%", height: '100vh' }} >

        //         <form className='' onSubmit={handleSubmit(onSubmit)}><br />
        //             <h1 className='m-5 text-center' style={{ fontSize: '2rem' }}>Log In</h1>

        //             <div className="form-group">
        //                 <label for="Email">Email address</label><small className='text-danger'>{ error.email || error.emailnotfound }</small>
        //                 <input type="email" className="form-control shadow-none" aria-describedby="email" placeholder="Enter your email" defaultValue={data.email} onChange={handleChange} require
        //                     name='email'
        //                 />
        //                 {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        //             </div>
        //             <div class="form-group">
        //                 <label for="Password" className='shadow-none'>Password</label><small className='text-danger'>{error.password || error.passwordincorrect }</small>
        //                 <input type="password" className="form-control shadow-none" placeholder="Enter your password" defaultValue={data.password} onChange={handleChange}
        //                     ref={register({
        //                         minLength: 5,
        //                     })}
        //                     name='password'
        //                 />
        //             </div>

        //             <div className='text-center my-5'>
        //                 <button className='btn btn-danger ' type='submit'>Log in</button>
        //             </div>
        //             <Link to='/register' style={{ textDecoration: 'none', display: 'block' }} className='text-danger ' >Create One</Link>
        //         </form>
        //     </div>


        // </div>
        <div className='d-flex flex-column container' style={{ height: '100vh' }} >
            <div class="alert alert-success text-center" role="alert" style={{ display: alert ? '' : 'none' }}  >
                <strong>Login Complete!</strong>
            </div>
            <div className='container d-flex d-flex-row' style={{ width: "100%", height: '35em', background: "#ffffff", "box-shadow": "5px 5px 11px #666666, -5px -5px 11px #ffffff", borderRadius: "50px", margin: 'auto' }} >
                <div className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                    <form className='' onSubmit={handleSubmit(onSubmit)} style={{ width: '80%' }}>
                        <h1 className='text-center font-italic font-weight-bold ' style={{ fontSize: '2rem' }}>Login</h1>
                        {/* Email */}
                        <div className="form-group">
                            <label for="Email" className='text-dark font-weight-bold'>Email address</label>
                            <input type="text" className="form-control text-dark" name="email" id='Email' aria-describedby="email" placeholder="Enter your email"
                                defaultValue={data.email} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", }} required />
                            <small class="form-text text-danger">{error.email}</small>
                            <small class="form-text text-danger">{error.emailnotfound}</small>
                        </div>

                        {/* Main password */}
                        <div class="form-group">
                            <label for="Password" className='text-dark font-weight-bold'>Password</label>
                            <input type="password" className="form-control text-dark" name="password" placeholder="Enter your password" id='Password'
                                defaultValue={data.password} onChange={handleChange}
                                style={{ background: "", "box-shadow": "inset 2px 2px 2px #666666, inset -2px -2px 2px #ffffff", borderRadius: "50px", }} required />
                            <small class="form-text text-danger">{error.password}</small>
                            <small class="form-text text-danger">{error.passwordincorrect}</small>
                        </div>



                        {/* <div className='text-center my-5'>
                     <button className='btn btn-danger shadow-none' type='submit'>Create Account</button>
                     <Link to='/login' style={{ textDecoration: 'none', display: 'block' }} className='text-danger '>Already Have An Account!</Link>
                 </div> */}
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-start">
                                <Link to='/login' style={{ display: 'block' }} className='text-dark font-italic font-weight-bold'>Create Account</Link>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button className='btn font-weight-bold font-italic btn-danger' type='submit'
                                    style={{ background: "", "box-shadow": "5px 5px 11px #666666, -5px -5px 11px #ffffff", borderRadius: "50px" }}
                                >Login</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.error
})

export default connect(mapStateToProps)(Login);
