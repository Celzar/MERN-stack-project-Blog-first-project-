import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'


const BlogList = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const userId = props.match.params.userId
        
        Axios.post(`http://localhost:8000/blogList/${userId}`)
            .then((res) => {
                if (res.data.success) {
                    setData(res.data.data)
                }
            })
    }, [])

    const convertStringToDate = (date) => {
        for (const x in date) {
            return new Date(date).toDateString()
        }
    }

  

    const renderData = data.map((blog, index) => {
        console.log(blog)
        return (

            // <div className="list-group m-3" style={
        //     { 'box-shadow': '5px 5px 14px #8a8a8a, -5px -5px 14px #ffffff' }
        // } >
        //     <Link to={`/read/${data._id}`}
        //         className="list-group-item list-group-item-action flex-column align-items-start" >
        //         <div className="media border p-3" >
        //             <div className="media-body" >
        //                 <h4 > {data.title} </h4>
        //                 <small > < i > {convertStringToDate(data.publicDate)} </i></small >
                       
        //             </div>
        //         </div >
        //     </Link>
           

        //     <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"
        //         style={{ background: "#ffffff" }} >
        //         <div class="btn-group mx-3 " role="group" aria-label="First group" style={{ width: ' 30%' }}>
        //             <button type="button" class="btn btn-outline-primary"
        //                 style={{ 'box-shadow': '5px 5px 14px #8a8a8a, -5px -5px 14px #ffffff', }}>Read</button>
        //         </div>
        //         <div class="btn-group mx-3" role="group" aria-label="Second group" style={{ width: ' 30%' }} >
        //             <button type="button" class="btn btn-outline-success " style={{ 'box-shadow': '5px 5px 14px #8a8a8a, -5px -5px 14px #ffffff', }} >
        //                 Update</button>
        //         </div >
        //         <div class="btn-group mx-3" role="group" aria-label="Second group" style={{ width: ' 30%' }} >
        //             <button type="button" class="btn btn-outline-danger" style={{ 'box-shadow': '5px 5px 14px #8a8a8a, -5px -5px 14px #ffffff', }}>
        //                 Delete</button>
        //         </div>
        //     </div>
        // </div >
        <>
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
            <Link to={`/read/${blog._id}`}> 
            <img className='bg-light'
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
   </>
        )
    })
    return (
    //     <div
    //     style={{ background: '', height: '100%' }}
    // >
        <div className="container mt-4">
                <div className='row justify-content-start'>
                    <div className='col-8'>
                        <h2 >Blogs page</h2>
                    </div>
                    {/* <div className='col-4'>
                        <form className={`form-inline my-1 my-lg-0  `}   >
                            <input className="form-control mr-sm-2 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark my-2 my-sm-0 shadow-none" type="submit">Search</button>
                        </form></div> */}
                </div>
       <div className='row'>
            {renderData}
            </div>  
        </div>
        
    );
}

export default BlogList;