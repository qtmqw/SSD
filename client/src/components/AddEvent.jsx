import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { event } from '../API'

const AddEvent = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [about, setAbout] = useState('');
    const [time, setTime] = useState('');
    const [googleMap, setGmaps] = useState('');
    const [waze, setWaze] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datas = { title, date, country, city, about, time, googleMap, waze };
            let res = await axios.post(event, datas);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
            <div>
                <Button
                    className="w-[100%] bg-deep-purple-400 uppercase text-white font-bold shadow text-sm py-2 rounded outline-none focus:outline-none sm:mr-2 mb-3"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Add Event
                </Button>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[100%] border-4 border-deep-purple-400">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Event
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <label className='lg:mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0 lg:pr-2'>
                                                <Input
                                                    size='lg'
                                                    id="title"
                                                    label="Title"
                                                    name="title"
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0'>
                                                <Input
                                                    size='lg'
                                                    id="date"
                                                    label="Date"
                                                    name="date"
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0 lg:pr-2'>
                                                <Input
                                                    size='lg'
                                                    id="country"
                                                    label="Country"
                                                    name="country"
                                                    type="text"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                            </div>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0'>
                                                <Input
                                                    size='lg'
                                                    id="city"
                                                    label="City"
                                                    name="city"
                                                    type="text"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3 w-full'>
                                            <Textarea
                                                size='lg'
                                                id="about"
                                                name="about"
                                                label="About"
                                                type="text"
                                                value={about}
                                                onChange={(e) => setAbout(e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            <div>
                                                <h3 className="text-3xl font-semibold border-t-2 border-dashed border-black pt-2 mb-5">
                                                    Publish 1h before meet
                                                </h3>
                                            </div>
                                        </label>
                                        <label className='mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0 lg:pr-2'>
                                                <Input
                                                    size='lg'
                                                    id="time"
                                                    label="Time"
                                                    name="time"
                                                    type="time"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0'>
                                                <Input
                                                    size='lg'
                                                    id="googleMap"
                                                    label="Google maps"
                                                    name="googleMap"
                                                    type="googleMap"
                                                    value={googleMap}
                                                    onChange={(e) => setGmaps(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0'>
                                                <Input
                                                    size='lg'
                                                    id="waze"
                                                    label="Waze"
                                                    name="waze"
                                                    type="waze"
                                                    value={waze}
                                                    onChange={(e) => setWaze(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <div className="flex items-center lg:justify-end sm:justify-between pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
                                            <Button type="submit" className='bg-deep-purple-400'>Pievienot produktu</Button>
                                            <Button
                                                className="bg-white text-red-500 background-transparent font-bold uppercase px-6 py-2 ml-3 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                                type="cancel"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Aizvērt
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default AddEvent