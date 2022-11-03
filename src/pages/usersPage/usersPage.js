import React, { useState, useEffect } from "react"
import "./usersPageStyles.css"

export default function UsersPage() {

  const [usersTable, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users`, {
          method: "get",
          headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`,
            'userId': JSON.parse(userId)
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
      } catch (err) {
        alert(err);
      }
    }
    getData()
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
          {usersTable.map((user) => {
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