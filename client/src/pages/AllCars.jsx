import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import {
  Typography,
} from "@material-tailwind/react";
import { AiFillHeart, AiFillEye, AiFillMessage } from 'react-icons/ai'
import axios from 'axios'
import { Link } from "react-router-dom";
import { carC } from '../API'


const AllCars = () => {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(carC)
      .then(response => {
        setCars(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container fluid className='text-center mx-36'>
      <h1 className='mt-28 mb-10 text-4xl font-semibold text-gray-800'>All Cars</h1>
      <div className='grid grid-cols-4 gap-4'>
        {cars.map((car) => (
          <Link to={`/profile/${car.user?.username}`}>
            <figure className="relative h-72 w-full cursor-pointer">
              <img
                className="h-full w-full rounded-xl object-cover object-center"
                src={car.image}
                alt="car"
              />
              <figcaption className="absolute bottom-8 left-1/4 flex -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    <div className='flex'>
                      <AiFillHeart />
                      <p className='text-sm'>Likes:</p>
                    </div>
                    <div className='flex'>
                      <AiFillEye />
                      <p className='text-sm'>Views:</p>
                    </div>
                    <div className='flex'>
                      <AiFillMessage />
                      <p className='text-sm'>Comments:</p>
                    </div>
                  </Typography>
                </div>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default AllCars