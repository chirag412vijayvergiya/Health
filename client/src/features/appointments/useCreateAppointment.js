import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAppointment as createAppointmentApi } from './../../services/apiAppointments';

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { mutate: createAppointment, isPending: isBooking } = useMutation({
    mutationFn: createAppointmentApi,
    onSuccess: (data) => {
      toast.success('Appointment successfully booked!');
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createAppointment, isBooking };
}
