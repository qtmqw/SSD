import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { IoLogoModelS } from 'react-icons/io';
import { BiSolidTimer } from 'react-icons/bi';
import { PickerOverlay } from 'filestack-react';
import { useParams } from 'react-router-dom';
import { profileU, carC } from '../API'

const AddMyCar = () => {
  const [image, setImage] = useState(null);
  const [isPickers, setIsPickers] = useState(false);
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [desc, setDesc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { username, id } = useParams();

  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${profileU}/${username}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datas = { image: image.filesUploaded[0].url, company, model, year, desc };
      let res = await axios.post(`${carC}/${userData.id}`, datas);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        className="lg:w-[50%] sm:w-full bg-deep-purple-400 uppercase text-white font-bold shadow text-sm py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add My Car
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
                    Add My Car
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                      {image ? (
                        <img
                          src={image && image.filesUploaded[0].url}
                          alt="imageUploded"
                          className="w-[30%] h-[10%] object-cover mx-auto"
                        />
                      ) : (
                        <button
                          onClick={() => (isPickers ? setIsPickers(false) : setIsPickers(true))}
                          type="button"
                          className="w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none text-blue-500 font-semibold"
                        >
                          Attēla izvēle
                        </button>
                      )}
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

export default AddMyCar