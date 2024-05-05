import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { useAuth } from '../../../Context/Authcontext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patientsignup as patientsignupApi } from './../../../../services/apiAuth';

export function usePatinetSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signuppatient, isLoading } = useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const user = await patientsignupApi({ fullName, email, password });
      console.log(user);
      return user; // Return the user data from patientsignupApi
    },
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(['user'], user);
      navigate('/issues', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { signuppatient, isLoading };
}
