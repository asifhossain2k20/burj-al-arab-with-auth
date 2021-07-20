import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const[loggedInUser,setLoginUser]=useContext(UserContext);
    const[bookings,setBookings]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                        authorization:`bearer ${sessionStorage.getItem('token')}` },
        })
        .then(res=>res.json())
        .then(data=>{setBookings(data)})
    },[])
    return (
        <div>
            <h3>Total Booking : {bookings.length}</h3>
            {
                bookings.map((book=><li key={book._id}>{book.name} from : {new Date(book.checkIn).toDateString('dd/MM/yy')} To :{new Date(book.checkOut).toDateString('dd/MM/yy')}</li>))
            }
        </div>
    );
};

export default Bookings;