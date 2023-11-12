import React from 'react'
import { Typography } from "@material-tailwind/react";
import Q from '../assets/q.jpg'
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

const About = () => {
  return (
    <>
      {/* <div>
        <div class="relative">
          <img src={Q} className='h-screen w-full object-cover object-center' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white bg-white/90 px-16 pb-16 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-black w-[55%] h-[42%]'>
            <div className='mt-10 font-semibold text-lg'>
              <Link to='/'><BsFillArrowLeftCircleFill className='w-7 h-7'/></Link>
            </div>
            <div className='mb-5'>
              <Typography variant="h1" className='uppercase text-9xl text-center italic font-serif font-semibold'>About</Typography>
            </div>
            <div className='font-semibold text-center text-xl'>
              Welcome to the Secret Society Drift – Unveiling the Thrilling Fusion of Cars, Parties, and the Mesmerizing World of Drifting!
            </div>
            <div className='mt-4'>
              Here, we invite you to delve into a realm where automotive passion, pulse-pounding events, and the artistry of controlled chaos collide. Secret Society Drift isn't just a club; it's a hidden oasis for enthusiasts, dreamers, and thrill-seekers who share an insatiable love for the world of cars and the electrifying spectacle of racing.
            </div>
            <div className='mt-4'>
              Becoming a part of Secret Society Drift means gaining access to a world of extraordinary car meets. Connect with fellow members who share your enthusiasm, learn from experienced drifters, and make memories that will last a lifetime.
            </div>
            <div className='mt-4'>
              As a member, you'll receive exclusive invitations to our meticulously crafted car meets, insider insights, and the opportunity to showcase your own ride among an audience that truly understands and appreciates the art of cars and drifting.
            </div>
            <div className='mt-4'>
              So, whether you're a long-time member or considering joining our inner circle for the first time, know that you're about to embark on a thrilling journey filled with roaring engines, breathtaking aesthetics, and the kind of unity that only a community as passionate as Secret Society Drift can provide. Welcome to the family!
            </div>
          </div>
        </div>
      </div> */}
      <div className='flex'>
        <div className='mx-auto mt-36 xl:w-[50%] lg:w-[80%] md:w-[90%] sm:w-[90%] mb-10'>
          <div className='mb-5'>
            <Typography variant="h1" className='uppercase lg:text-9xl md:text-9xl sm:text-7xl text-center italic font-serif font-semibold'>About</Typography>
          </div>
          <div className='font-semibold text-center lg:text-xl sm:text-lg'>
            Welcome to the Secret Society Drift – Unveiling the Thrilling Fusion of Cars, Parties, and the Mesmerizing World of Drifting!
          </div>
          <div className='mt-4 sm:text-justify'>
            Here, we invite you to delve into a realm where automotive passion, pulse-pounding events, and the artistry of controlled chaos collide. Secret Society Drift isn't just a club; it's a hidden oasis for enthusiasts, dreamers, and thrill-seekers who share an insatiable love for the world of cars and the electrifying spectacle of racing.
          </div>
          <div className='mt-4 sm:text-justify'>
            Becoming a part of Secret Society Drift means gaining access to a world of extraordinary car meets. Connect with fellow members who share your enthusiasm, learn from experienced drifters, and make memories that will last a lifetime.
          </div>
          <div className='mt-4 sm:text-justify'>
            As a member, you'll receive exclusive invitations to our meticulously crafted car meets, insider insights, and the opportunity to showcase your own ride among an audience that truly understands and appreciates the art of cars and drifting.
          </div>
          <div className='mt-4 sm:text-justify'>
            So, whether you're a long-time member or considering joining our inner circle for the first time, know that you're about to embark on a thrilling journey filled with roaring engines, breathtaking aesthetics, and the kind of unity that only a community as passionate as Secret Society Drift can provide. Welcome to the family!
          </div>
        </div>
      </div>
    </>
  )
}

export default About

