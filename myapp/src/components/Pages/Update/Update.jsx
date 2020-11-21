import React, { Component } from 'react'
import Rewrite from './Rewrite'
// import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Axios from 'axios'

class Update extends Component {

    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            img: '',
            imgExtension: '',
            content: '',
            rawContent: '',
            RawContentState: false
        }
    }

    

    componentWillMount() {

        this.setState({ RawContentState: false})

        const _id = this.props.match.params.id;
        Axios.post(`http://localhost:8000/read/${_id}`)
            .then((res) => {
                
                if (res.data.success) {
                    this.setState({
                        title: res.data.data[0].title,
                        foreword: res.data.data[0].foreword,
                        img: res.data.data[0].img,
                        imgExtension: res.data.data[0].imgExtension,
                        rawConten: res.data.data[0].content
                    })
                    window.localStorage.setItem('rawContent', res.data.data[0].content)
                    // this.setState({ RawContentState: true})
                }
            })
            .catch((err) => {
                console.log(err)
            })
            
            
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.setState)
    // }


    render () {
        return (
            <Rewrite  
            title={this.state.title} 
            img={this.state.img} 
            foreword={this.state.foreword}
            imgExtension={this.state.imgExtension}
            rawContent={this.state.rawContent}
            // RawContentState={this.state.RawContentState ? true: false} 
            />
        )
    }
}

export default Update