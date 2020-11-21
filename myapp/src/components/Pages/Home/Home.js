import React, { useEffect, useState } from 'react';
import Nav from './Navigation'
import { Link } from 'react-router-dom'
import Axios from 'axios'
// import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
// import draftToMarkdown from 'draftjs-to-markdown';
// import draftToHtml from 'draftjs-to-html'
// import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
// import Popup from 'reactjs-popup'

import './Home.css'

const Home = () => {

    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8000/contents')
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.contents)
                    setblogs(res.data.contents)
                } else {
                    alert('couldn\'t get blog\'s lists')
                }
            })
    }, [])


    const convertStringToDate = (date) => {
        for (const x in date) {
            return new Date(date).toDateString()
        }
    }
    const renderCards = blogs.map((blog, index) => {
        console.log(blog)

        return (
            <Fade bottom >

                {/* <div className="col-6 my-3 mx-0" >
                    <div className="card shadow-soft text-center border-light" >
                        <div className="card-header">
                            <span className="card-text small">
                                <span className="far fa-calendar-alt mr-2"></span>
                                15 March 2020</span>
                        </div>
                        <div className="card-body">

                            <Link to={`/read/${blog._id}`} className='' style={{ textDecorationColor: '#90a4ae' }}>
                                <div className="card-title bg-dark text-white p-3 mb-0">{blog.title}</div>
                                <h3 className="h5 card-title text-dark">{blog.title}</h3>
                            </Link>
                            <div className="card" style={{ height: "11rem", overflow: 'auto', width: '100%', margin: '0' }}>
                                <div className="card-body" >
                                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(blog.content)) }} className="card-text" />
                                </div>
                            </div>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary btn-sm">Learn More</a>
                        </div>
                        <div className="card-footer">
                            <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="23k followers">
                                <img className="avatar-sm mr-2 img-fluid rounded-circle" src="../../assets/img/team/profile-picture-2.jpg" alt="Moore avatar"/> 
                                Jo J. Moore
                                </a>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-4 ">
                    <div className="card  border-light shadow-soft">
                        <img src="../../assets/img/blog/blog-article-1.jpg" className="card-img-top rounded-top" alt="Themesberg office" />
                        <div className="card-body">
                            <span className="h6 icon-tertiary small"><span className="fas fa-medal mr-2"></span>Awards</span>
                            <h3 className="h5 card-title mt-3">We partnered up with Google</h3>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary btn-sm">Learn More</a>
                        </div>
                    </div>
                </div> */}

                {/* ui 2 */}
                {/* 
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12  my-3 mx-0" >
                    <div className="card  border-light shadow-soft" style={{ 'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff', }}>
                        <div className="card-header p-3" style={{ paddingTop: '100%' }}> */}
                {/* <img
                                // src={"https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/600x_a4-3_cTC/PostGazettenewspaper3-1585327715.jpg"} 
                                src={blog.ImageProfilePath}
                                className="card-img-top rounded" alt="Designer desk" /> */}

                {/* {(blog.img === '' || blog.img === null || blog.img === undefined) ?
                                (
                                    // <svg className="bd-placeholder-img card-img-top rounded" style={{ width: '100%', height: '11rem', objectFit: 'contain' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 200x200">
                                    //     <rect style={{ width: '100%', height: '11rem', objectFit: 'contain' }} fill="#868e96"></rect>
                                    //     <text x="43%" y="50%" fill="#dee2e6">Image</text>
                                    // </svg>
                                    ''
                            //     ) : (
                            //         <img
                            //             src={`data:${blog.imgExtension};base64,${blog.img}`}
                            //             style={{ width: '100%', height: '11rem', objectFit: 'contain' }}
                            //             className="card-img-top rounded"
                            //         />)

                            // } */}





                {/* <div className="media d-flex align-items-center justify-content-between" > */}
                {/* 
                            <div className="p-2 bd-highlight" >
                                <a href="#" data-toggle="tooltip" data-placement="top" title="" className='text-dark'
                                    style={{ width: '10%', paddingTop: '100%' }}>
                                    {/* <img className="avatar-sm mr-2 img-fluid rounded-circle" src="../../assets/img/team/profile-picture-2.jpg" alt="Jo portrait" />  */}
                {/* {blog.Author.username} */}
                {/* <img className="mx-2" style={{ 'border-radius': '50%', width: '8%' }}
                                        src='https://images.pexels.com/photos/3381013/pexels-photo-3381013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                                    // src={blog.ImageProfilePath}
                                    />
                                    <span>Oh My god</span>
                                </a>
                                <br />
                                <span className="small"><span className="far fa-calendar-alt mr-2"></span>{convertStringToDate(blog.publicDate)}</span>
                            </div> */}

                {/* <div className="d-flex ml-auto p2">
                                <span className="small"><span className="far fa-calendar-alt mr-2"></span>{convertStringToDate(blog.publicDate)}</span>
                                </div> */}
                {/* 
                            </div> */}
                {/* </div> */}
                {/* <div className="card-body" >

                            <Link to={`/read/${blog._id}`} className='' style={{ textDecorationColor: '#90a4ae' }}>
                                <div className="card-title bg-dark text-white p-3 mb-0">{blog.title}</div>
                                <h3 className="h5 card-title text-dark text-capitalize">{blog.title}</h3>
                            </Link>
                            <div className="card" style={{ height: "11rem", overflow: 'auto', width: '100%', margin: '0', }}>
                                <div className="card-body" >
                                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(blog.content)) }} className="card-text " />
                                </div>
                            </div> */}
                {/* <div className="card-body" style={{ width: '100%' }}>
                            {(blog.title === '') ?
                                (<h5 className="card-title text-dark text-capitalize"
                                    style={{ height: "7rem", overflow: 'auto', width: '100%', margin: '0' }}>
                                </h5>) : (
                                    <h5 className="my-3"
                                        style={{ width: '100%', margin: '0', maxWidth: '18rem' }}>
                                        <Link className='card-title text-dark text-capitalize' style={{ textDecorationColor: '#90a4ae', }}
                                            to={`/read/${blog._id}`}
                                        >
                                            {blog.title}
                                        </Link>
                                    </h5>
                                )}
                            <div className='container' >
                                {blog.foreword === '' ? '' :
                                    (<div className="card" style={{ width: '100%', maxWidth: '18rem' }}>
                                        <div className="card-body" >
                                            <small className='text-muted' >
                                                {blog.foreword}
                                            </small>
                                        </div>
                                    </div>)}
                            </div>
                            <br />
                            <Link to={`/read/${blog._id}`} className='' >
                                <button className="btn btn-md" id='SPbutton'>
                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div> */}
                {/* <div className='row'> */}


                <div className="card border-light mb-3 col-lg-4 col-sm-6 col-md-7  col-7 mx-0 " >
                    <div className='container'>
                        <Link to={`/dashboard`}><small className='font-weight-bold mt-2 text-secondary'
                            id='extraSmallUserName'
                        >{blog.Author.username}</small></Link>
                        <Link to={`/read/${blog._id}`}>
                            <h5 className='font-weight-bold text-dark' id='extraSmall'>{blog.title}</h5>
                        </Link>
                        <small
                            className='text-secondary'
                            id='extraSmall'>{blog.foreword}</small>
                        <p><small>{convertStringToDate(blog.publicDate)}</small> </p>
                    </div>
                </div>
                <div className='col-lg-2 col-sm-4 col-md-5 col-4 mb-3 mx-0'>
                    {blog.img === '' || blog.imgExtension === '' ?
                        <Link to={`/read/${blog._id}`}> <img className='bg-light'
                            style={{
                                width: `100%`,
                                height: `100%`,
                                backgroundPosition: 'center center',
                                position: 'absolute',
                                'background-size': 'cover',
                                backgroundRepeat: 'no-repeat',
                                'object-fit': 'cover',
                                top: '0',
                                left: '0',
                            }} />
                        </Link> :
                        <Link to={`/read/${blog._id}`}>
                            <img src={`data:${blog.imgExtension};base64,${blog.img}`}
                                style={{
                                    width: `100%`,
                                    height: `100%`,
                                    backgroundPosition: 'center center',
                                    position: 'absolute',
                                    'background-size': 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    'object-fit': 'cover',
                                    top: '0',
                                    left: '0',
                                }}
                            />
                        </Link>
                    }
                </div>
                {/* </div> */}

            </Fade>

        )
    })


    return (
        <div
            style={{ background: '', height: '100%' }}
        >
            <Nav style={{}} />
            <div classname='container-fluid jumbotron ' style={{ width: '100%', height: '80vh', position: 'relative' }}>
                <img
                    src='https://images.pexels.com/photos/1340588/pexels-photo-1340588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    style={{
                        width: '100%', height: '100%', filter: 'blur(0.7px)',
                        'object-fit': 'cover',
                        'object-position': 'center center'
                    }}
                />

                <div className="content" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    // background: 'rgb(0, 0, 0)', 
                    background: 'rgba(0, 0, 0,0.5)',
                    color: '#f1f1f1',
                    width: '100%',
                    padding: '1%',
                    'text-align': 'center'

                }}>
                    <h1 className="display-4">Hello, world!</h1>
                    <p className="lead">Publish your passions your way. Whether you'd like to share your knowledge, experiences or the latest news.</p>
                    <hr className="my-4" />
                    <p> create a unique and beautiful blog for free.</p>
                    <p className="lead">
                        <Link to='/content'>
                            <button className='btn  btn-outline-light my-3 '   >
                                Click
                        </button>
                        </Link>
                    </p>
                </div>
            </div>
            <div className="container mt-4">
                <div className='row justify-content-start'>
                    <div className='col-8'>
                        <h2 >Blogs page</h2></div>
                    {/* <div className='col-4'>
                        <form className={`form-inline my-1 my-lg-0  `}   >
                            <input className="form-control mr-sm-2 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark my-2 my-sm-0 shadow-none" type="submit">Search</button>
                        </form></div> */}
                </div>
                <div className='row'>
                    {renderCards}
                </div>
            </div>
                       

        </div>
    );
}

export default Home;
