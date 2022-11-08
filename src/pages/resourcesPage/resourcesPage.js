import React, { useState, useEffect } from "react"
import "./resourcesPageStyles.css"
import Spinner from 'react-bootstrap/Spinner'

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function ResourcesPage() {

  const [resourcesData, setResourcesData] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if(token) {
            const getResourcesData = async () => {
                try {
                const response = await fetch(
                    `${BASE_URL}/resources`, {
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
                let parsedResourcesData = await response.json();
                setResourcesData(parsedResourcesData.response);
                setLoading(true);
                } catch (err) {
                    alert(err);
                }
            }
            getResourcesData()
        }
    }, [])
  
  return (
    <div className="table-container">
      {loading ? <table>
        <thead>
          <tr>
            <th>ResourceId</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {resourcesData.map((resource) => {
            return (<tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.name}</td>
              <td>{resource.status}</td>
            </tr>)
          })}
        </tbody>
      </table> : <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      
    </div>
  );
}