// import React, { useState, useEffect } from 'react';
import React, { Component, useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import './content.css'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from './Navigation'


// import Popup from 'reactjs-popup'
// import { rejects } from 'assert';





class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            fullScreen: false,
            OnLoadFile: null,
            fileIsEmpty: false,
            foreword: '',
            file: null,
            ImageProfilePath: null,
            imgCheck: null,
            errors: false,
            errorMessage: '',
            content: '',
          
        }
    }

    isEmpty(variable) {
        const type = typeof variable
        if (variable === null) return true
        if (type === 'undefined') return true
        if (type === 'boolean') return false
        if (type === 'string') return !variable
        if (type === 'number') return false
        if (Array.isArray(variable)) return !variable.length
        if (type === 'object') return !Object.keys(variable).length
        return !variable
    }

    componentWillMount() {
        if (localStorage.getItem('content')) {
            this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(window.localStorage.getItem('content')))) })
        }



        // var _id = "5f8590636196d42d007e56fc";

        // Axios.post(`http://localhost:8000/read/${_id}`)
        //     .then((res) => {
        //         // console.log(this.content)
        //         console.log(res.data.data[0])
        //         if (res.data.success) {
        //             return { ...res.data.data[0] }
        //         }
        //     }).then(
        //         (data) => {
        //             // if (localStorage.getItem('content')) {
        //             //     this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(window.localStorage.getItem('content')))) })
        //             // }

        //             console.log(data)

        //             this.setState({
        //                 title: data.title,
        //                 foreword: data.foreword,
        //                 img: data.img,
        //                 imgExtension: data.imgExtension,
        //                 content: data.content,
        //                 editorState: EditorState.createWithContent(convertFromRaw(
        //                     { "blocks": [{ "key": "c5shl", "text": "sdfefaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }
        //                 ))
        //             })

        //         })



    }

    onEditorStateChange = (editorState) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        this.setState({ editorState: editorState })
        // console.log(editorState)
    }

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                var formData = new FormData()
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                formData.append('image', file);
                Axios.post('http://localhost:8000/uploadImages', formData, config)
                    .then(res => {
                        console.log(file)
                        console.log(res.data)
                        // this.setState({ ImageProfilePath: res.data.link })
                        return resolve({ data: res.data })
                    }).catch((err) => {
                        reject(err)
                        console.log(err)
                    })



            })
    }

    checkAlignment = (data) => {
        console.log(data.entityMap)
        if (Object.keys(data.entityMap).length != 0) {
            for (const x in data.entityMap) {
                if (data.entityMap[x].data) {
                    if (data.entityMap[x].data.alignment === "none" || data.entityMap[x].data.alignment === false || data.entityMap[x].data.alignment === undefined) {
                        // console.log(convertToRaw(editorState.getCurrentContent()).entityMap[x].data.alignment === "none")
                        data.entityMap[x].data.alignment = "center"
                        return { ...data }
                    }
                }
            }
        } else {
            return { ...data }
        }

    }

    handleSubmit = (e) => {

        e.preventDefault()

        // console.log('onlicked ')
        const data = {
            title: this.state.title,
            foreword: this.state.foreword,
            content: JSON.stringify(this.checkAlignment(convertToRaw(this.state.editorState.getCurrentContent()))),
            id: this.props.auth.user.id,
            img: this.state.file ? true : false
        }

        // const img = this.state.base64TextString
        // if (this.state.file) {
        // if (this.state.ImageProfilePath != '') {

        if (this.state.file) {
            let formData = new FormData()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            formData.append('image', this.state.file);
            Axios.post('http://localhost:8000/uploadAsBase64', formData, config)
                .then(res => {
                    if (res.data.success) {
                        if (data) {
                            Axios.post('http://localhost:8000/uploadcontent', data)
                                .then(res => {
                                    if (res.data.success) {

                                        setTimeout(() => alert(res.data.message), 2000)
                                        localStorage.removeItem('content');
                                        this.props.history.push('/home')
                                    }
                                })
                        }
                    }
                }
                ).catch((err) => {
                    console.log(err.response)
                })
        } else {
            if (data) {
                Axios.post('http://localhost:8000/uploadcontent', data)
                    .then(res => {
                        if (res.data.success) {
                            setTimeout(() => alert(res.data.message), 2000)
                            localStorage.removeItem('content');
                            this.props.history.push('/home')
                        }
                    }
                    )
            }
        }
    }

    componentDidMount() {
        if (localStorage.getItem('content')) {
            this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(window.localStorage.getItem('content')))) })
        }
    }
    // this.props.history.push('/home')
    // }


    full = () => {
        this.setState({ fullScreen: true })
    }

    fullclose = () => {
        this.setState({ fullScreen: false })
    }

    FileHandleChange = (event) => {
        if (event.target.files[0]) {
            this.setState({ ImageProfilePath: URL.createObjectURL(event.target.files[0]), file: event.target.files[0] })
        } else {
            this.setState({ ImageProfilePath: URL.revokeObjectURL(event.target.files[0]) })
        }
    }



    render() {
        console.log(this.state.content)


        return (
            <div className='bg-light' >

                <div className='container-fluid bg-light' style={{ height: '100vh', width: '100%', position: 'fixed', display: this.state.fullScreen ? '' : 'none' }}>
                    <h1 className='' style={{ paddingLeft: '90%', display: this.state.fullScreen ? '' : 'none' }}>
                        <button className='btn btn-light shadow-none' type="button" onClick={this.fullclose}>X</button>
                    </h1>
                    <div className='container'>
                        <div classname='row'>
                            <div className='col'>
                                <div
                                    className='px-3'
                                    style={{ width: '80%' }}
                                >
                                    <form className='my-4'>
                                        <label className='mr-2 font-weight-bold' style={{ fontSize: '1.3rem', border: 'none' }}>Title</label>
                                        {/* {this.state.title.length >= 100 ? <small className='text-success'>you can have 100 characters on title and foreword</small> : ''} */}
                                        {this.state.errors ? <small className='text-success'>{this.state.errorMessage}</small> : ''}
                                        <input name='title' className='shadow-none mb-2' style={{ width: '100%' }} placeholder='Title'
                                            onChange={(e) => this.setState({ title: e.target.value })} required maxLength='100' />

                                        <label htmlFor='foreword' className='mr-2 font-weight-bold' style={{ fontSize: '1.3rem', border: 'none' }}>Foreword</label>
                                        {/* {this.state.foreword.length >= 100 ? <small className='text-danger'>Foreword must Less than 100 characters</small> : ''} */}
                                        <textarea className="shadow-none" style={{ width: '100%' }} id="foreword" rows="3" wrap="hard" name='foreword' maxLength='100'
                                            placeholder='foreword'
                                            onChange={(e) => {
                                                this.setState({ foreword: e.target.value })
                                            }}
                                        />
                                    </form>

                                    {/* file upload lib */}
                                    <input type='file' onChange={this.FileHandleChange} />
                                    <br />
                                    <br />
                                    {/* <br /> */}
                                    <div className="card  border-light shadow-soft"
                                        style={{
                                            'box-shadow': '8px 8px 16px #c9cccf,-8px -8px 16px #ffffff',
                                            'width': '18em',
                                        }}>
                                        <div className="card-header p-3" style={{ paddingTop: '100%' }}>
                                            <img
                                                src={this.state.ImageProfilePath}
                                                style={{ width: '100%', height: '11rem', objectFit: 'contain', }}
                                                className="card-img-top rounded"
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <button
                                        className={`btn btn-dark`}
                                        onClick={
                                            (e) => {
                                                if (this.isEmpty(this.state.title)) {
                                                    return this.setState({ errorMessage: 'Title cannot be empty', errors: true })
                                                }
                                                console.log('test')
                                                this.setState({ errors: false, errorMessage: '' })
                                                return this.handleSubmit(e)
                                            }

                                            //  this.handleSubmit

                                        }
                                    >Public</button>
                                </div >
                            </div>
                        </div>
                    </div>

                </div>
                <Nav fullScreen={!this.state.fullScreen} />
                <div className='d-flex bd-highlight container ' >
                    <div className='p-2 shadow-sm p-3 mb-5 bg-white rounded mt-5'
                        style={{ display: !this.state.fullScreen ? '' : 'none', width: '100%' }}
                    // style={{ display:'none' }}
                    >
                        <Editor
                            toolbarClassName="toolbar-className shadow-sm bg-white rounded"
                            editorClassName="editor-className shadow-sm bg-white rounded"
                            wrapperClassName="wrapper-className  shadow-sm bg-white rounded"
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                                image: {
                                    uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false }, inputAccept: 'image/gif,image/jpeg,image/jpg,image/', previewImage: true, urlEnabled: true, alignmentEnabled: true, defaultSize: {
                                        height: 'auto',
                                        width: '100%',
                                    },
                                }
                            }}
                            defaultEditorState={this.state.editorState}
                            style={{ width: '100%' }}
                            placeholder='Please Enter your story here'
                            // Event
                            onEditorStateChange={this.onEditorStateChange}
                        /><div className=''>
                            <button className='btn mt-2' style={{ background: '#333333', color: '#f0f0f0', width: '100%', display: !this.state.fullScreen ? '' : 'none' }} onClick={this.full}>Post</button>
                            
                        </div>
                    </div>

                </div >
            </div >
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps)(Content);
