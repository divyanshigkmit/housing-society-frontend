import React, { useState, useEffect } from "react"
import "./usersPageStyles.css"
import Spinner from 'react-bootstrap/Spinner'

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      let getUsersData = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/users`, {
            method: "get",
            headers: {
              'Content-type': 'application/json',
              'authorization': token
            }
          });
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let parsedUsersData = await response.json();
          setUsersData(parsedUsersData.response);
          setLoading(true);
        } catch (err) {
          alert(err);
        }
      }
      getUsersData();
    }

  }, [])

  return (

    <div className="table-container">
      {loading ? <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => {
            return (<tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email_id}</td>
              <td>{user.contact_number}</td>
            </tr>)
          })}
        </tbody>
      </table> : <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      
      
    </div>
  );
}
