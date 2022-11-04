import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props) {

    const PageDisplay = props.page;
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token == undefined) {
            navigate('/login');
        }
    })
    

    return <div><PageDisplay /></div>
}
export default Protected;