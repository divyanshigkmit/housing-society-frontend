import React, { useState, useEffect } from "react"
import "./bookingsPageStyles.css"

export default function BookingPage() {

  const [bookingsTable, setData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/bookings`, {
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
            <th>BookingId</th>
            <th>ResourceId</th>
            <th>UserId</th>
            <th>ReserveDate</th>
          </tr>
        </thead>
        <tbody>
          {bookingsTable?.map((booking) => {
            return (<tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.resource_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.reserve_date}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}