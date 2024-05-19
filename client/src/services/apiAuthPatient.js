import customFetch from '../utils/customFetch';

export async function patientsignup({ fullName, email, password }) {
  try {
    const res = await customFetch.post(
      '/patient/signup',
      {
        name: fullName,
        email,
        password,
        passwordConfirm: password,
      },
      { withCredentials: true },
    );
    // const userRole = res.data.data.model.role;
    // Cookies.set('userRole', userRole, { expires: 7 });
    return res.data;
  } catch (err) {
    console.error(err);
    // toast.error(err.message);
    throw new Error('Failed to signup');
  }
}

export async function patientLogin({ email, password }) {
  try {
    const response = await customFetch.post(
      `/patient/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(response.data.data.model.role);
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}
