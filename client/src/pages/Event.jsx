import React, { useEffect, useState } from 'react';
import { event } from '../API';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const Event = () => {
    const [events, setEvents] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${event}/${id}`)
            .then((res) => {
                setEvents(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (events === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='uppercase text-3xl font-bold text-center my-5'>Event</div>
            <div key={events._id} className='flex'>
                <div className='w-[50%]'>
                    <Card className="mt-6 w-96 h-[100%] mx-auto border-2 border-solid border-black shadow-xl">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2 uppercase text-center">
                                Info
                            </Typography>
                            <Typography>
                                <p>Name: {events.title}</p>
                                <p>Country: {events.country}</p>
                                <p>City: {events.city}</p>
                                <p>About: {events.about}</p>
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                <div className='w-[50%]'>
                    <Card className="mt-6 w-96 h-[100%] mx-auto border-2 border-solid border-black shadow-xl">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2 uppercase text-center">
                                Hidden Info
                            </Typography>
                            <Typography>
                                <p>Time: {events.time}</p>
                                <p>Google Maps: {events.googleMap}</p>
                                <p>Waze: {events.waze}</p>
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Event;
//sdfsdf