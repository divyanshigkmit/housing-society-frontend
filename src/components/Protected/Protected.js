import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props) {

    const Cmp = props.page;
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token == undefined) {
            navigate('/login');
        }
    })
    

    return <div><Cmp /></div>
}
export default Protected;