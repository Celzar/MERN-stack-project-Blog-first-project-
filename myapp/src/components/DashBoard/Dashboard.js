import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Nav from './Navigation'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import Avatar from 'react-avatar-edit'

import Fade from 'react-reveal/Fade';

const Dashboard = (props) => {

  const [imageSrc, setImageSrc] = useState('')
  const [data, setData] = useState([]);
  const [editPop, seteditPop] = useState(false);
  const [imgFile, setImgFile] = useState(null)
  const [alert, setalert] = useState(false);
  const [user, setuser] = useState({
    img: '',
    imgExtension: '',
    username: '',
    email: ''
  });

  const [popupDelete, setpopupDelete] = useState(false);


  useEffect(() => {
    const userId = props.auth.user.id
    Axios.post(`http://localhost:8000/getUser/${userId}`)
      .then(res => {
        if (res.data.success) {
          setuser({
            img: res.data.img,
            imgExtension: res.data.imgExtension,
            username: res.data.username,
            email: res.data.email
          })
        }
      })

    console.log(userId)
    Axios.post(`http://localhost:8000/blogList/${userId}`)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {

          setData(res.data.data)
        }
      })
  }, [data])


  const convertStringToDate = (date) => {
    for (const x in date) {
      return new Date(date).toDateString()
    }
  }


  const onChange = (event) => {
    if (event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImgFile(event.target.files[0])
    } else {
      URL.revokeObjectURL(event.target.files[0])
    }
  }


  const handleClick = () => {
    // seteditPop(true)

    const data = {
      userId: props.auth.user.id,
      img: imgFile ? true : false,
    }

    if (imgFile) {
      let formData = new FormData()
      const config = {
        'content-type': 'multipart/form-data'
      }
      formData.append('image', imgFile)
      Axios.post('http://localhost:8000/uploadAsBase64', formData, config)
        .then(res => {
          if (res.data.success) {
            Axios.post('http://localhost:8000/uploadUserProfile', data)
              .then(res => {
                if (res.data.success) {
                  console.log(res.data.data)
                  setalert(true)
                  setTimeout(() => {
                    setalert(false)
                  }, 2000)
                }

              })

            seteditPop(false)
          }
        }).catch(
          (err) => {
            console.log(err.response)
          }
        )
    }
  }

  console.log(user)



  const renderData = data.map((blog, index) => {
    console.log(blog)

    return (
      <Fade bottom >
        <div className="card border-light mb-3 col-lg-4 col-sm-6 col-md-7  col-7 mx-0" style={{}}>
          <div className='container'>
            <Link to={`/blogList/${blog.Author._id}`}><small className='font-weight-bold mt-2 text-dark'>
              {blog.Author.username}
            </small></Link>
            <Link to={`/read/${blog._id}`}>
              <h5 className='font-weight-bold text-dark'>{blog.title}</h5>
            </Link>
            <small className='text-secondary'>{blog.foreword}</small>
            <p><small>{convertStringToDate(blog.publicDate)}</small> </p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link to={`/read/${blog._id}`} type="button" className="btn btn-secondary">Read</Link>
              {/* <Link to={`/UpdateContent/${blog._id}`} type="button" className="btn btn-secondary">Update</Link> */}
              <Link to={`/rewrite/${blog._id}`} type="button" className="btn btn-secondary">Update</Link>

              <button type="button" className="btn btn-secondary" onClick={
                (e) => {

                  if (window.confirm('If you click ok your content going to be deleted permanently')) {
                    Axios.post('http://localhost:8000/deleteContent', {id: blog._id})
                      .then(res => {
                        if (res.data.success) {
                          console.log(res.data.data)
                          setpopupDelete(true)
                          setTimeout(function(){ 
                            setpopupDelete(false)
                          }, 1500);
                        }


                      })
                  }
                }
              }>Delete</button>
            </div>
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


      </Fade>

    )
  })



  return (

    <div>

      <Nav />


      <div className=' text-success' style={{
        position: 'sticky',
        padding:'1%',
        textAlign: 'center',
        display: popupDelete? '': 'none' 
      }}>
        <h5> Your content was deleted!</h5>
      </div>
      <div className="alert alert-success text-center" role="alert" style={{ display: alert ? '' : 'none' }} >
        <strong>Login Complete!</strong>
      </div>
      <div className='container-fluid my-3' style={{
        width: '100%', minHeight: '88vh', maxHeight: '100%', zIndex: '2', display: editPop ? '' : 'none',
      }}>


        <center className='container d-flex flex-column' style={{
          minHeight: '30em',
          maxHeight: '100em',
          alignItems: 'center',
          'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff',
          maxWidth: '40em',
          minWidth: '20em',
        }}>
          <button style={{ marginLeft: '90%' }}
            className='btn  btn-outline-dark my-4' onClick={
              () => seteditPop(false)
            }>X</button>


          <div style={{ width: '60%', 'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff' }} className='shadow-soft p-2 m-4 mb-5'  >
            <label className='mx-1 font-weight-bold' style={{ fontSize: '1.3rem', border: 'none' }}>Profile Image</label>
            <div style={{
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              'padding-top': '100%',
            }}

            >
              {/* {imageSrc === '' ?
                ''
                :
                (<img alt='no image' src={imageSrc}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundPosition: 'center',
                    position: 'absolute',
                    'background-size': 'cover',
                    backgroundRepeat: 'no-repeat',
                    'object-fit': 'cover',
                    top: '0',
                    left: '0',
                  }}
                />)} */}

              {imageSrc === '' ?
                (<img src={`data:${user.imgExtension};base64,${user.img}`}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundPosition: 'center',
                    position: 'absolute',
                    'background-size': 'cover',
                    backgroundRepeat: 'no-repeat',
                    'object-fit': 'cover',
                    top: '0',
                    left: '0',
                  }}
                />) :
                (<img src={imageSrc}
                  style={{
                    // backgroundImage: `url(${imageSrc})`,
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
                />)}

            </div>

            <div classname=''>
              <input type='file' onChange={onChange} className='my-3' required /><br />
              <button type="submit" className="btn btn-outline-dark btn-sm" onClick={handleClick}>Done</button>
            </div>
          </div>
        </center>
      </div>





      <div className='container-fluid' style={{
        // background: 'linear-gradient(90deg, rgba(96,197,170,1) 29%, rgba(47,180,200,1) 73%) ', 
        width: '100%', 'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff',
        // opacity: editPop ? '0' : '1'
        display: !editPop ? '' : 'none',
        minHeight: '70vh',
        maxHeight: '100%',
      }}>

        {/* <div style={{background:'black', height:'100vh'}}>

            </div> */}
        {/* <button onClick={
                ()=>Axios.post(`http://localhost:8000/content/`, props.auth.user).then((res)=>res.data)
              } >request</button> */}

        {/* {contents.map(content => (<h2>{content}</h2>))} */}
        <div className='container' style={{


        }}>
          <div className="d-flex flex-column p-5" style={{ width: '100%', 'align-items': ' center', }}>
            <div style={{
              'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff',
              minHeight: '20em',
              maxHeight: '100em',
              maxWidth: '40em',
              minWidth: '20em',

            }} className='shadow-soft p-2' >
              <div className="shadow-sm bg-white " style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                'padding-top': '100%',
                overflow: 'hidden',
              }}>

                {imageSrc === '' ?
                  (<img src={`data:${user.imgExtension};base64,${user.img}`}
                    style={{
                      width: `100%`,
                      height: `100%`,
                      backgroundPosition: 'center',
                      position: 'absolute',
                      'background-size': 'cover',
                      backgroundRepeat: 'no-repeat',
                      'object-fit': 'cover',
                      top: '0',
                      left: '0',
                    }}
                  />) :
                  (<img src={imageSrc}
                    style={{
                      // backgroundImage: `url(${imageSrc})`,
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
                  />)}
              </div>
              <center className='m-2'><button type="button" className="btn btn-outline-dark btn-sm" onClick={
                () => seteditPop(true)
              }> Edit</button></center>
            </div>

            <div className="p-2 "><h3>My Name</h3></div>

          </div>
        </div>
      </div>
      <hr style={{ display: !editPop ? '' : 'none' }} />
      <center style={{ display: !editPop ? '' : 'none' }} className='container my-5'>
        <h3>Your Stories</h3>
        {/* here */}
      </center>

      <div className='container' style={{ display: !editPop ? '' : 'none' }}>

        <div className='row'>
          {renderData}
        </div>
      </div>
    </div >
  );
}



const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);
