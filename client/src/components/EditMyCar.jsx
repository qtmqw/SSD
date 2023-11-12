import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { IoLogoModelS } from 'react-icons/io';
import { BiSolidTimer } from 'react-icons/bi';
import { PickerOverlay } from 'filestack-react';
import { carC } from '../API'

const EditMyCar = ({ car }) => {
  const [image, setImage] = useState(car.image);
  const [isPickers, setIsPickers] = useState(false);
  const [company, setCompany] = useState(car.company);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [desc, setDesc] = useState(car.desc);
  const [showModal, setShowModal] = useState(false);


  const handleUpdateCar = async (e) => {
    e.preventDefault();

    const carData = {
      image: hasImageChanged() ? image.filesUploaded[0].url : image,
      company,
      model,
      year,
      desc,
    };

    try {
      // Make an API request to the backend route for updating the user profile
      const response = await axios.patch(`${carC}/${car._id}`, carData);
      /* window.location.reload() */
      // The backend will return the updated user profile data
      const updatedCar = response.data;
      // You can update the state or show a success message here if needed
    } catch (error) {
      console.error(error);
      // Handle error here or show an error message
    }

    // Close the modal after the form submission
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
      <Button
        className="w-[100%] bg-deep-purple-400 uppercase text-white font-bold shadow text-xs rounded outline-none focus:outline-none sm:mr-2 mb-1 px-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit My Car
      </Button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
              <div className="rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[100%] border-4 border-deep-purple-400">
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit My Car
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleUpdateCar} encType='multipart/form-data'>
                    <label className='mb-3 flex'>
                      <div className='w-[50%] pr-2'>
                        <Input
                          size="lg"
                          label="Company"
                          required
                          type="text"
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                      <div className='w-[50%] pr-2'>
                        <Input
                          size="lg"
                          label="Model"
                          required
                          type="text"
                          id="company"
                          icon={<IoLogoModelS />}
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>
                    </label>
                    <label className='mb-3 flex'>
                      <div className='w-[50%] pr-2'>
                        <Input
                          size="lg"
                          label="Year"
                          required
                          type="text"
                          id="year"
                          icon={<BiSolidTimer />}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                    </label>
                    <label className='mb-3 w-full'>
                      <Textarea
                        id="description"
                        label="Description"
                        required
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </label>
                    <label
                      className="flex justify-center "
                    >
                      {image
                        ?
                        <img src={image} alt="..." className='w-[27%] h-[15%] border border-blue-gray-200 rounded-lg mr-4' />
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
                    <div className="mt-4 relative">
                      {isPickers && (
                        <PickerOverlay
                          apikey={"AcmyGdQDuRAu7wUWvGlDwz"}
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
                      )}
                    </div>
                    <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
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

export default EditMyCar