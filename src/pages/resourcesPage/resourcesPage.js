import React, { useState, useEffect } from "react"
import "./resourcesPageStyles.css"

export default function UsersPage() {

  const [resourceTable, setData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/resources`, {
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
        setData(actualData);
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
            <th>ResourceId</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {resourceTable.response?.map((resource) => {
            return (<tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.name}</td>
              <td>{resource.status}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}