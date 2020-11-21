import React, { useState, useEffect } from 'react';

// @import --middlewares
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Axios from 'axios'
import { connect } from 'react-redux'



const Navigation = (props) => {
    // @ state
    const [collapsed, setcollapsed] = useState(true);
    const [img, setImg] = useState();
    const [imgExtension, setImgExtension] = useState()

    const [data, setData] = useState({
        img: '',
        imgExtension: '',
        username: '',
        success: false
    })

    useEffect(() => {
        const userId = props.auth.user.id
        Axios.post(`http://localhost:8000/getUser/${userId}`)
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.data[0].img)
                    // setImg(res.data.img)
                    // setImgExtension(res.data.imgExtension)
                   
                    setData({
                        img: res.data.img,
                        imgExtension: res.data.imgExtension,
                        username: res.data.username,
                        success: true
                    })
                
                }
            })
    }, [])

    //  const img = data.map(value=>{

    //  })


    // @ function

    const handlesubmitSearch = (e) => {
        e.preventDefault()
    }

    console.log(data)

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light"
        // style={{ width: '100%', top: '0', zIndex: '2' }}
        >

            <button onClick={() => setcollapsed(!collapsed)} className='navbar-toggler navbar-toggler-right' type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>



            <div
                className={`${collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'}`}
                // className='collapse navbar-collapse'
                id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item ">
                        <Link className="nav-link" to='/home'>Home</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/content">Story</Link>
                    </li>

                </ul>

                {/* <Link className="navbar-brand " href="/home">Blogalaxy</Link> */}
                {
                    data.success ?
                        data.img != undefined?
                            (<Link className="navbar-brand" to='/dashboard'>
                                <img  src={`data:${data.imgExtension};base64,${data.img}`} width="30" height="30" class="d-inline-block align-top" alt="" />
                                {" "}<small classname='bg-dark'>{data.username}</small>
                            </Link>)
                            : (<Link className="navbar-brand" to='/dashboard'>
                                <img  width="30" height="30" class="d-inline-block align-top" alt="" />
                                {" "}<small classname='bg-dark'>{data.username}</small>
                            </Link>)
                        :
                        <Link className="navbar-brand" to='/login'>
                            Login
                        </Link>
                }
            </div>



        </nav>


    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps)(Navigation);
