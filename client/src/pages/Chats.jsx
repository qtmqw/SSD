import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { nameU, profileU, messageU } from '../API'
import { Container } from "react-bootstrap";
import {
  Avatar
} from "@material-tailwind/react";
import Z from '../assets/z.png'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { username, id } = useParams();
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const chatContainerRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(messageU);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`${profileU}/${username}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchCurrentUser();
  }, [username, id]);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(messageU, {
        userId: userData.id,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className="mx-auto mt-10">
      <div className="flex flex-col items-center">
        <div
          ref={chatContainerRef}
          className="xl:w-[40%] lg:w-[70%] md:w-[100%] sm:w-[100%] bg-deep-purple-200 shadow-md p-4 rounded-lg overflow-y-auto mb-4 h-[50rem]"
        >
          {messages.map(({ _id, username, message, image }) => (
            <div
              key={_id}
              className={`mb-2 ${username === currentUser.username
                ? "self-end text-right"
                : "self-start"
                }`}
            >
              <p
                className={`${username === currentUser.username
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white text-gray-800 self-start"
                  } p-2 rounded-lg block text-left break-words w-[100%]`}
              >
                {image ? <Avatar src={image} alt={username} className="mr-2 rounded-full"/> : <Avatar src={Z} alt={username} className="mr-2"/>}{username === currentUser.username ? "" : `${username}:`} {message}
              </p>
            </div>
          ))}
        </div>
        <form
          onSubmit={sendMessage}
          className="xl:w-[40%] lg:w-[70%] md:w-[100%] sm:w-[100%] bg-deep-purple-400 shadow-md p-4 rounded-lg"
        >
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full rounded-l-lg px-3 py-2 border-r-0 border-t border-b border-gray-300 placeholder-gray-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Chat;
