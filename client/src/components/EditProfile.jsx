import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { PickerOverlay } from 'filestack-react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';
import { profileU, users } from '../API'

const EditProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const { username: paramUsername } = useParams();
    const [image, setImage] = useState(null);
    const [isPickers, setIsPickers] = useState(false);
    const [formUsername, setFormUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');
    const [userId, setUserId] = useState(null); // State to store the user's ID
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Function to fetch the user's profile data from the backend
        const fetchUserProfile = async () => {
            try {
                // Make an API request to the backend to get the user's profile data
                const response = await axios.get(`${profileU}/${paramUsername}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("loggedIn")}`, // Pass the JWT token as a header
                    },
                });

                // The backend will return the user's profile data
                const userProfile = response.data.data;
                setUserId(userProfile.id);
                setImage(userProfile.image);
                setFormUsername(userProfile.username);
                setEmail(userProfile.email);
                setCountry(userProfile.country);
                setCity(userProfile.city);
                setBio(userProfile.bio);
            } catch (error) {
                console.error(error);
                // Handle error here or show an error message
            }
        };
        const fetchAndSortCountries = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/all`);
                const unsortedCountries = response.data;
                const sortedCountries = sortCountriesAlphabetically(unsortedCountries);
                setCountries(sortedCountries);
            } catch (error) {
                console.error(error);
            }
        };

        // Call the function to fetch and sort the countries when the component mounts
        fetchAndSortCountries();
        fetchUserProfile();
    }, []);

    const sortCountriesAlphabetically = (unsortedCountries) => {
        return unsortedCountries.sort((a, b) => {
            const countryA = a.name.common.toLowerCase();
            const countryB = b.name.common.toLowerCase();
            return countryA.localeCompare(countryB);
        });
    };

    const handleImageChange = (newImage) => {
        setImage(newImage);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const profileData = {
            image: hasImageChanged() ? image.filesUploaded[0].url : image,
            username: formUsername,
            email,
            country,
            city,
            bio,
        };

        try {
            const response = await axios.patch(`${users}/${userId}`, profileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loggedIn")}`,
                },
            });
            const updatedProfile = response.data;
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    };

    const hasImageChanged = () => {
        if (image && image.filesUploaded) {
            return true;
        }
        return false;
    };

    return (
        <>
            <div>
                <Button
                    className="lg:w-[50%] sm:w-full bg-deep-purple-400 uppercase text-white font-bold shadow text-sm py-2 rounded outline-none focus:outline-none sm:mr-2 mb-3"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Edit Profile
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
                                        Edit Profile
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleUpdateProfile} encType='multipart/form-data'>
                                        <label className='lg:mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0 lg:pr-2'>
                                                <Input
                                                    size='lg'
                                                    id="username"
                                                    label="Username"
                                                    name="username"
                                                    type="text"
                                                    value={formUsername}
                                                    onChange={(e) => setFormUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0'>
                                                <Input
                                                    ssize='lg'
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3 flex sm:flex-col lg:flex-row'>
                                            <div className='lg:w-[50%] sm:w-full sm:mb-4 lg:mb-0 lg:pr-2'>
                                                <select
                                                    size='lg'
                                                    id="country"
                                                    name="country"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-3 bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-blue-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-md sm:leading-6"
                                                >
                                                    <option value=""></option>
                                                    {countries.map((country) => (
                                                        <option value={country.name.common}>{country.name.common}</option>
                                                    ))}
                                                </select>
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
                                                id="bio"
                                                name="bio"
                                                label="Bio"
                                                type="text"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            />
                                        </label>
                                        <label
                                            className="flex justify-center "
                                        >
                                            {image
                                                ?
                                                <Avatar src={image} alt="..." className='  w-[100%]  h-[40%] mr-4 shadow-xl rounded-full' style={{ width: '170px', height: '130px' }} />
                                                :
                                                <div></div>
                                            }
                                            <button
                                                type="button"
                                                className="w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none text-blue-500 font-semibold"
                                                onClick={() => (isPickers ? setIsPickers(false) : setIsPickers(true))}
                                            >
                                                Attēla izvēle
                                            </button>
                                        </label>
                                        {isPickers && (
                                            <div className="mt-4">
                                                <PickerOverlay
                                                    apikey="AcmyGdQDuRAu7wUWvGlDwz"
                                                    onSuccess={(res) => {
                                                        setImage(res);
                                                        setIsPickers(false);
                                                    }}
                                                    onError={(res) => alert(res)}
                                                    pickerOptions={{
                                                        maxFiles: 1,
                                                        accept: ["image/*"],
                                                        errorsTimeout: 2000,
                                                        maxSize: 1 * 1000 * 1000,
                                                    }}
                                                />
                                            </div>
                                        )}
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

export default EditProfile