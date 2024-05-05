import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';
// import { useUser } from '../Context/UserConstext';
import customFetch from '../utils/customFetch';

function Issues() {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      try {
        const res = await customFetch('/patient/me');

        setUsername(res.data.data.name);
      } catch (err) {
        toast.error(err.message);
      }
    };

    verifyCookie();
  }, []);

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  // const { user } = useUser();
  return (
    <div className="items-center">
      <h1>Dashboard</h1>
      <p>{/* Welcome <span>{user.data}</span> */}</p>
      <button className="logout-button">Logout</button>
    </div>
  );
}

export default Issues;
