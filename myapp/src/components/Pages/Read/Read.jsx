import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import draftToHtml from 'draftjs-to-html'
import {Link} from 'react-router-dom'
import Nav from './Navigation'


const Read = (props) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const _id = props.match.params.id
        console.log(props.match.params.id)
        Axios.post(`http://localhost:8000/read/${_id}`)
        .then((res)=>{      
            if(res.data.success){
                console.log(res.data.data)
                setData(res.data.data)
                
            }else{
                alert("failed")
            }
        })
    },[])
    const convertStringToDate = (date) => {
        for (const x in date) {
            return new Date(date).toDateString()
        }
    }

        // const linkBreakString = (string)=>{
        //     // string.map((mappedString, index)=>{
        //     //     console.log(mappedString)
        //     // })
        //     // if(string[133]){
        //     //    string = string[133] + "<h1>hello</h1>";
        //     //     // return data
        //     //     console.log(string)
        //     //     return string
        //     // }
        //     for(let i = 0; i <= string.length;i++){
        //         const lineBreak = "<br/>"
        //         if(string[i] === 133){
        //             console.log(string[i].concat(lineBreak))
        //             return string[i].concat(lineBreak)
        //         }
        //         // console.log(string[i])
        //     }
        //     // console.log("hello")
        // }


    // const arrayString = (array)=>{
    //     // console.log(array)
    //     for(let i=0; i<=array.length;i++){
    //         console.log("hello ",array)
    //     }
    // }



    const renderData = data.map((data, index)=>{
    
        // arrayString(JSON.parse(data.content).blocks)

        // console.log(JSON.parse(data.content).blocks)

        return(
            <div className='container' style={{minWidth:'60%', maxWidth: '100%'}}>
               <h2 className='text-center text-capitalize font-weight-normal my-3' 
               style={{'font-family': '"Times New Roman", Times, serif', }}
               >{data.title}</h2>
               <p className='text-muted'>
                <small className=''><Link to={`/blogList/${data.Author._id}`} className='text-dark '>{data.Author.username}</Link></small><br/>
                <small>{convertStringToDate(data.publicDate)}</small>
                </p>
                <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(data.content)) }} className='container'  />
            </div>
        )
    })

    return (
        <div > 
            <Nav/>
        <div className="container" >
           {renderData}
        </div>
        </div>
    );
}

export default Read;
