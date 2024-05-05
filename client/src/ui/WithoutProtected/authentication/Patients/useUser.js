import { useEffect, useState } from 'react';
import axios from 'axios';

const useUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // If access token is not available, set user data to null
        setUserData(null);
        return;
      }
      try {
        // Fetch user data from the backend
        const response = await axios.get('/patient/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include authentication token
          },
        });
        // Set the user data
        setUserData(response.data.data.model);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If there's an error, set user data to null
        setUserData(null);
      }
    };

    getUser(); // Call getUser when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run effect only once

  return userData;
};

export default useUser;
