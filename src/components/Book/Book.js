import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const[loggedInUser,setLoginUser]=useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });

        const handleCheckInDateChange = (date) => {
            const newDate ={...selectedDate}
            newDate.checkIn=date;
            setSelectedDate(newDate);
        };

        const handleCheckOutDateChange = (date) => {
            const newDate ={...selectedDate}
            newDate.checkOut=date;
            setSelectedDate(newDate);
        };

        const handleBooking = ()=>{
            const newBooking ={...loggedInUser,...selectedDate}
            fetch('http://localhost:5000/addBooking',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(newBooking)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>hey {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Check In date"
                value={selectedDate.checkIn}
                onChange={handleCheckInDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Check Out Date"
                format="dd/MM/yyyy"
                value={selectedDate.checkOut}
                onChange={handleCheckOutDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />

            </Grid>
            <Button onClick={handleBooking} variant="contained" color="primary">
                    BOOK NOW!!!
            </Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;