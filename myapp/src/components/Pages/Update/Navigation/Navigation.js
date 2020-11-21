import React, { useState } from 'react';

// @import --middlewares
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'


// @Route --Object
const Endpoint = {
    Home: {
        path: '/',
        linkName: 'Home'
    },
    Login: {
        path: '/login',
        linkName: 'Login'
    },
    Register: {
        path: '/register',
        linkName: 'Create One'
    }

}



const Navigation = (props) => {
    // @ state
    const [collapsed, setcollapsed] = useState(true);
    const [search, setsearch] = useState(false);



    //@ middlware config



    // @ function

    const handlesubmitSearch = (e) => {
        e.preventDefault()
    }



    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: props.fullScreen ? '' : 'none' }}>
            <a className="navbar-brand" href="#">Navbar</a>
            <button onClick={() => setcollapsed(!collapsed)} className='navbar-toggler navbar-toggler-right' type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>



            <div className={`${collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'}`} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'>{Endpoint.Home.linkName}</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>

                </ul>


                <form className={`form-inline my-1 my-lg-0 mr-2 ${search ? '' : 'd-none'}`} onSubmit={handlesubmitSearch}  >
                    <input className="form-control mr-sm-2 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark my-2 my-sm-0 shadow-none" type="submit">Search</button>
                </form>

                <button className='btn btn-outline-dark mr-2 shadow-none' onClick={() => setsearch(!search)}>
                    <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    </svg>
                </button>

                {/* <Popup trigger={<button type="button" className={`btn btn-outline-dark shadow-none ${collapsed ? 'mx-2' : ''}`} >
                    <svg class="bi bi-person-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z" />
                    </svg></button>} modal closeOnDocumentClick>


                    {close => (
                        <div>
                            <div style={{ height: '30vh' }}>
                                <h1 className='text-center'>Account</h1> <hr />
                                <div className='text-center'>
                                    <Link to={Endpoint.Login.path}><button className='btn btn-dark mx-2 my-5' style={{ width: '10vw' }}>
                                        {Endpoint.Login.linkName}
                                    </button></Link>
                                    <Link to={Endpoint.Register.path}><button className='btn btn-dark mx-2 my-5' style={{ width: '10vw' }}>
                                        {Endpoint.Register.linkName}</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='text-center' style={{ height: '5vh' }}>
                                <Link className='text-dark text-decoration-none' onClick={close}>Cancel</Link>
                            </div>
                        </div>
                    )}
                </Popup> */}

            </div>



        </nav>


    );
}

export default Navigation;
