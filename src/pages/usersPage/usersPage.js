import React, { useState, useEffect } from "react"
import "./usersPageStyles.css"

export default function UsersPage() {
  const [usersData, setUsersData] = useState([]);

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token) {
      let getUsersData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users`, {
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
        } catch (err) {
          alert(err);
        }
      }
      getUsersData(localStorage.getItem('token'));
    }

  }, [])

  return (
    <div className="table-container">
      <table>
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
      </table>
    </div>
  );
}