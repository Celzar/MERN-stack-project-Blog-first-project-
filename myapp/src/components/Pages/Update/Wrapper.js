import React, { useEffect, Component } from 'react';
import { Route } from 'react-router-dom'
import Axios from 'axios'


const Wrapper = ({ component: component, ...rest }) => {

    useEffect(() => {
        const _id = props.match.params.id;
        Axios.post(`http://localhost:8000/read/${_id}`)
            .then((res) => {
                if (res.data.success) {
                    window.localStorage.setItem('rawContent', res.data.data[0].content)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    <Component {...props} />
                }   
            }
        />
    );
}

export default Wrapper;
