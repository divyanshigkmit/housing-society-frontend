import React, { useState, useEffect } from "react"
import "./usersPageStyles.css"

export default function UsersPage() {

    const [usersTable, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/users`,{ 
                method: "get" ,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`, 
                }
              }
            );
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            let actualData = await response.json();
            setData(actualData.response);
            setError(null);
          } catch(err) {
            setError(err.message);
            setData(null);
          } finally {
            setLoading(false);
          }  
        }
        getData()
      }, [])

    console.log(usersTable);
    return (
        <h1>Users Page</h1>
    );
}