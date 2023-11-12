import React, { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    MobileNav,
    Avatar,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Z from '../assets/z.png'
import { FaUserCircle } from 'react-icons/fa'
import { nameU } from '../API'

export default function StickyNavbar() {
    const [username, setUsername] = useState(null);
    const [image, setImage] = useState(null);
    const [openNav, setOpenNav] = React.useState(false);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get(nameU, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setImage(response.data.image);
                setUsername(response.data.username);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsername();
    }, []);

    const isLoggedIn = window.localStorage.getItem("loggedIn")

    const logOut = () => {
        window.localStorage.clear()
        window.location.href = "../"
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/events" className="flex items-center">
                    Events
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/discussions" className="flex items-center">
                    Discussions
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/about" className="flex items-center">
                    About
                </Link>
            </Typography>
        </ul>
    );


    return (
        <Navbar className=" py-2 px-4 lg:px-8 lg:py-4">
            <div className=" flex items-center justify-between text-blue-gray-900">
                <Link to="/">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 italic font-serif font-semibold text-xl"
                    >
                        SECRET SOCIETY DRIFT
                    </Typography>
                </Link>
                <div className="hidden lg:block">{navList}</div>
                {!isLoggedIn &&
                    <Link to='/SignIn'>
                        <Button size="md" className="bg-deep-purple-400 lg:flex hidden">
                            <span>Sign in</span> <FaUserCircle className=" mt-0.5 ml-2 " />
                        </Button>
                    </Link>
                }
                {isLoggedIn &&
                    <Menu>
                        <MenuHandler>
                            {image ?
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer"
                                    src={image}
                                />
                                :
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer"
                                    src={Z}
                                />
                            }
                        </MenuHandler>
                        <MenuList>
                            {username ?
                                <Link to={`/profile/${username}`} className="flex items-center gap-2">
                                    <MenuItem className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <Typography variant="small" className="font-normal">
                                            My Profile
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                : "Loading..."}
                            <Link to={`/chats`} className="flex items-center gap-2">
                                <MenuItem className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                                        />
                                    </svg>
                                    <Typography variant="small" className="font-normal">
                                        Chats
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <hr className="my-2 border-blue-gray-50" />
                            <MenuItem className="flex items-center gap-2 " onClick={logOut}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal" >
                                    Sign Out
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                }
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    <Link to='/SignIn'>
                        <Button size="md" className="bg-deep-purple-400 w-full flex justify-center ">
                            <span>Sign in</span> <FaUserCircle className=" mt-0.5 ml-2 " />
                        </Button>
                    </Link>
                </div>
            </MobileNav>
        </Navbar >
    );
}