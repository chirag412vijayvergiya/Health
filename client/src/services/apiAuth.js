import axios from 'axios';
export async function patientsignup({ fullName, email, password }) {
  console.log({ fullName, email, password });
  const { response, error } = await axios.post(
    'http://127.0.0.1:8000/api/v1/patient/signup',
    {
      name: fullName,
      email,
      password,
      passwordConfirm: password,
    },
    { withCredentials: true },
  );

  if (error) throw new Error(error.message);
  console.log(response);
  return response;
}
