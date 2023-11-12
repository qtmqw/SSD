import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Q from '../assets/q.jpg'
import { Input, Button } from "@material-tailwind/react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios';
import { regU } from '../API'

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType] = useState("0")
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [countries, setCountries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datas = { username, email, country, city, password, userType };
      let res = await axios.post(regU, datas);
      console.log(res.data);
      window.location.replace('/SignIn')
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePassword = (password) => {
    const errors = [];
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens lielais burts');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens mazais burts');
    }
    if (!/(?=.*[0-9])/.test(password)) {
      errors.push('Parolē jābūt vismaz viens cipars');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Parolē jābūt vismaz viens speciāls simbols');
    }
    if (/\s/.test(password)) {
      errors.push('Parolē nevar būt atstarpju');
    }
    if (password.length < 8) {
      errors.push('Parolei vajag būt vismaz 8 simbolus garai');
    }
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    if (confirmPassword !== "" && e.target.value !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== "" && e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  useEffect(() => {

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
  }, [])

  const sortCountriesAlphabetically = (unsortedCountries) => {
    return unsortedCountries.sort((a, b) => {
      const countryA = a.name.common.toLowerCase();
      const countryB = b.name.common.toLowerCase();
      return countryA.localeCompare(countryB);
    });
  };

  return (
    <Container fluid className='mx-auto h-screen'>
      <figure className="relative h-full w-full">
        <img
          className="h-full w-full object-cover object-center"
          src={Q}
          alt="nature"
        />
        <figcaption className="absolute lg:bottom-96 sm:bottom-28 left-2/4 flex flex-col xl:w-[25%] lg:w-[40%] md:w-[60%] sm:w-[90%] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="mt-2">
                  <Input
                    size='lg'
                    id="username"
                    label="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <Input
                    size='lg'
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <select
                    size='lg'
                    id="country"
                    name="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-0 py-3 bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-blue-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-md sm:leading-6"
                  >
                    <option>Country</option>
                    {countries.map((country) => (
                      <option value={country.name.common}>{country.name.common}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="mt-2">
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
              </div>
              <div>
                <div className="mt-2 relative">
                  <Input
                    size='lg'
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <checkbox onClick={togglePasswordVisibility} className="absolute bottom-0 right-0 text-2xl pb-2 pr-3">
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </checkbox>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <Input
                    size='lg'
                    id="confirm_password"
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                {passwordMatchError && (
                  <div className="text-red-500 text-xs mb-2">
                    <AiOutlineWarning className="inline-block mr-1" />
                    Paroles nesakrīt.
                  </div>
                )}
                <span className=" text-xs font-bold text-gray-500">
                  Paroles prasības:
                </span><br />
                {passwordErrors.length > 0 && (
                  <div className="flex flex-wrap text-red-500 text-xs">
                    {passwordErrors.map((error, index) => (
                      <div key={index} className="w-full">
                        <AiOutlineWarning className="inline-block mr-1" />
                        {error}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className=" w-full bg-deep-purple-400 shadow-deep-purple-200 p-3 rounded-xl font-semibold text-white"
              >
                Sign up
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-700 border-t border-gray-500 pt-4">
              Have profile?
              <a href="/SignIn" className="font-semibold leading-6 text-deep-purple-400 hover:text-deep-purple-300"> Sign in</a>
            </p>
          </div>
        </figcaption>
      </figure>
    </Container >
  )
}

export default SignUp