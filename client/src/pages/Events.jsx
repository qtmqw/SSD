import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import V from '../assets/v.jpg';
import { FaMeetup } from 'react-icons/fa';
import AddEvent from '../components/AddEvent';
import { event } from '../API';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(event);
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Group events by year and sort events within each year by date in descending order
    const eventsByYear = Object.entries(
        events.reduce((acc, event) => {
            const year = new Date(event.date).getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(event);
            return acc;
        }, {})
    ).reduce((acc, [year, events]) => {
        acc[year] = events.sort((a, b) => new Date(b.date) - new Date(a.date));
        return acc;
    }, {});

    // Get unique years and sort them in descending order
    const years = Object.keys(eventsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <>
            <div>
                <img src={V} alt="..." className="w-full object-cover h-[20rem] mt-3" />
            </div>
            <Container className="mx-auto ">
                <div className="mt-5 flex justify-end">
                    <AddEvent />
                </div>
                {years.map((year) => (
                    <div key={year}>
                        <div className="uppercase font-bold font-serif mt-5 lg:text-6xl sm:text-2xl">
                            <h1>
                                {new Date().getFullYear() === year
                                    ? `Upcoming events in ${year}`
                                    : `Previous events in ${year}`}
                            </h1>
                        </div>
                        <div className="uppercase font-bold font-serif mt-5 lg:text-3xl sm:text-lg">
                            {eventsByYear[year].map((event) => (
                                <div key={event._id} className="flex mb-4">
                                    <span className="mt-1 mr-3">
                                        <FaMeetup />
                                    </span>
                                    <Link to={`/e/${event._id}`}>
                                        <h2>
                                            {event.title} {event.date}
                                        </h2>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>
        </>
    );
};

export default Events;
