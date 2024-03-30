import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (fullName, email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/v1/patient/signup',
        {
          name: fullName,
          email,
          password,
          passwordConfirm: password,
        },
      );
      //   console.log(res);
      if (res.status >= 200 && res.status < 300) {
        toast.success(`${fullName}, Welcome To Jeevan Family`);
        console.log('Account successfully created!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error: Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};

export default useSignup;
