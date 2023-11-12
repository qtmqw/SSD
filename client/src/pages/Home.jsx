import React from 'react'
import { Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='relative'>
                <div>
                    <Typography variant="h1" className='uppercase lg:text-9xl sm:text-3xl text-center italic font-serif font-semibold mt-5'>secret society drift</Typography>
                </div>
                <div className='flex justify-center lg:mt-16 sm:mt-8 lg:gap-24 sm:gap-14 border-b-2 border-black pb-5'>
                    <Typography variant="h1" className='uppercase lg:text-5xl sm:text-sm text-center italic font-serif font-semibold  cursor-pointer'><Link to='/events'>Events</Link></Typography>
                    <Typography variant="h1" className='uppercase lg:text-5xl sm:text-sm text-center italic font-serif font-semibold  cursor-pointer'><Link to='/discussions'>Discussions</Link></Typography>
                    <Typography variant="h1" className='uppercase lg:text-5xl sm:text-sm text-center italic font-serif font-semibold  cursor-pointer'><Link to='/about'>About</Link></Typography>
                </div>
            </div>
            <div>
                
            </div>
        </>
    )
}

export default Home