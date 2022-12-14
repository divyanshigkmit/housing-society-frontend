import React, { useState, useEffect } from "react"
import "./bookingsPageStyles.css"
import Spinner from 'react-bootstrap/Spinner'

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function BookingsPage() {

  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token) {
        const getBookingsData = async () => {
            try {
                const response = await fetch(
                `${BASE_URL}/bookings`, {
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
                let parsedBookingsData = await response.json();
                setBookingsData(parsedBookingsData.response);
                setLoading(true);
            } catch (err) {
              alert(err);
            }
        }
        getBookingsData()
    }
    
  }, [])

  return (
    <div className="table-container">
      {loading ? <table>
        <thead>
          <tr>
            <th>BookingId</th>
            <th>ResourceId</th>
            <th>UserId</th>
            <th>ReserveDate</th>
          </tr>
        </thead>
        <tbody>
          {bookingsData?.map((booking) => {
            return (<tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.resource_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.reserve_date}</td>
            </tr>)
          })}
        </tbody>
      </table> : <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      
    </div>
  );
}