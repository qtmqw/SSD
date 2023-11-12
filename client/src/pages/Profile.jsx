import React, { useState, useEffect } from 'react'
import Z from '../assets/z.png'
import AddMyCar from '../components/AddMyCar';
import EditMyCar from '../components/EditMyCar';
import RegClub from '../components/RegClub';
import EditProfile from '../components/EditProfile';
import { AiFillHeart, AiFillMessage } from 'react-icons/ai'
import { IoLogoModelS } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@material-tailwind/react';
import { BiSolidTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { nameU, profileU, carC } from '../API'

const Profile = () => {

  const { username, id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userCar, setUserCar] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(nameU, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${profileU}/${username}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUserData();
  }, [username, id]);

  useEffect(() => {
    if (userData) {
      axios.get(`${carC}/${userData.id}`)
        .then(response => {
          setUserCar(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [userData, id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const MySwal = withReactContent(Swal);

  const handleRemove = async (carId) => {
    MySwal.fire({
      title: 'Vēlaties izdzēst?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF7D1A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${carC}/${carId}`);
          if (response.status === 200) {
            // If the deletion was successful, you can update the userCar state by removing the deleted car
            setUserCar(prevCars => prevCars.filter(car => car._id !== carId));
          } else {
            // Handle other status codes, if needed
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div>
      <main className="profile-page">
        <section className="relative block" style={{ height: "600px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300" style={{ display: 'flex', minHeight: '56vh' }}>
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {userData.image ?
                        <Avatar src={userData.image} alt="avatar" className='  w-[100%] h-[40%]  shadow-xl rounded-full -m-20 mx-auto' style={{ width: '200px', height: '200px' }} />
                        :
                        <Avatar alt="avatar" className='  w-[100%] h-[40%]  shadow-xl rounded-full -m-20 mx-auto' style={{ width: '200px', height: '200px' }} src={Z} />
                      }
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center sm:mt-16">
                    {currentUser && currentUser.username === username && (
                      <div className="pt-8 px-3 sm:mt-0">
                        <div>
                          <EditProfile />
                        </div>
                        <div>
                          <AddMyCar />
                        </div>
                        <div className='mt-2'>
                          <RegClub />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1 flex flex-col justify-center">
                    <div className="flex justify-center pt-8 lg:text-xl sm:text-lg font-semibold leading-normal text-gray-800">
                      Info about me & my car
                    </div>
                    <div className="flex justify-center   pt-4">
                      <div className="flex flex-col mr-6">
                        <div className='flex justify-center'>
                          <div className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            22
                          </div>
                          <AiFillHeart className="text-xl font-bold text-gray-700 mt-0.5" />
                        </div>
                        <span className="text-sm text-gray-500">My Car Likes</span>
                      </div>
                      <div className="flex flex-col mr-6">
                        <div className='flex justify-center'>
                          <div className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            1
                          </div>
                          <IoLogoModelS className="text-xl font-bold text-gray-700 mt-0.5" />
                        </div>
                        <span className="text-sm text-gray-500"> My Cars</span>
                      </div>
                      <div className="flex flex-col">
                        <div className='flex justify-center'>
                          <div className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                          </div>
                          <AiFillMessage className="text-xl font-bold text-gray-700 mt-0.5" />
                        </div>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 ">
                    {userData.username}
                  </h3>
                  <h3 className="text-md font-semibold leading-normal mb-6 text-gray-500 ">
                    {userData.email}
                  </h3>
                  <div className="text-sm leading-normal mt-0 text-gray-500 font-bold uppercase">
                    <i className="mr-2 text-lg text-gray-500"></i>{" "}
                    {userData.country}, {userData.city}
                  </div>
                  <div className="text-gray-700 mt-8 font-bold uppercase">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    info about me
                  </div>
                </div>
                <div className="py-10 border-b border-gray-400 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      {userData.bio ?
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          {userData.bio}
                        </p>
                        :
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          The user has not added his bio
                        </p>
                      }
                    </div>
                  </div>
                </div>
                <div className="mb-8 mt-4">
                  <h1 className="text-4xl font-semibold leading-normal mb-4 text-gray-800 text-center">
                    My Car
                  </h1>
                  {userCar.map((car) => (
                    <div className='flex justify-between sm:flex-col lg:flex-row mb-6 shadow-xl rounded-xl' key={car._id}>
                      <div className='lg:w-[50%] sm:w-full'>
                        <img src={car.image} alt="..." className=' rounded-xl' />
                      </div>
                      <div className='lg:w-[45%] sm:w-full'>
                        <h1 className="text-2xl font-semibold leading-normal mb-2 text-gray-800 text-center uppercase">
                          info
                        </h1>
                        <div className='flex flex-col sm:ml-2 lg:ml-0'>
                          <div className='flex justify-between'>
                            <div>
                              <div className='mb-4'>
                                <p className='uppercase font-semibold'>Company</p>
                                <p> {car.company} </p>
                              </div>
                              <div className='mb-4'>
                                <p className='uppercase font-semibold'>Model</p>
                                <p> {car.model} </p>
                              </div>
                              <div className='mb-4'>
                                <p className='uppercase font-semibold'>Year</p>
                                <p> {car.year} </p>
                              </div>
                            </div>
                            {currentUser && currentUser.username === username && (
                              <div className='sm:hidden lg:flex'>
                                <div className='mr-4'>
                                  <EditMyCar key={car._id} car={car} />
                                </div>
                                <div className="w-[20%] mt-1.5">
                                  <BiSolidTrash
                                    className=" cursor-pointer text-2xl "
                                    color="red"
                                    onClick={() => handleRemove(car._id)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className='uppercase font-semibold'>Desc.</p>
                            <p> {car.desc} </p>
                          </div>
                          {currentUser && currentUser.username === username && (
                            <div className='lg:hidden sm:flex justify-between'>
                              <div className='mr-4'>
                                <EditMyCar key={car._id} car={car} />
                              </div>
                              <div className="w-[20%] mt-1.5">
                                <BiSolidTrash
                                  className=" cursor-pointer text-2xl "
                                  color="red"
                                  onClick={() => handleRemove(car._id)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile