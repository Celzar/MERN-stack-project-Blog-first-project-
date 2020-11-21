import React,{useEffect, useState} from 'react';
import Axios from 'axios';

const Context = () => {
    useEffect(()=>{
        Axios.get('http/localhost:8000/read/')
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Context;
