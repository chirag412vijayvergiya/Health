import customFetch from '../utils/customFetch';
import Cookies from 'js-cookie';

export async function updateUserData({ fullName, Gender, photo }) {
  try {
    let role = Cookies.get('userRole');
    console.log(role);
    if (role === 'admin') role = 'doctor';
    const formdata = new FormData();
    formdata.append('name', fullName);
    formdata.append('gender', Gender);
    formdata.append('photo', photo);

    for (let [key, value] of formdata.entries()) {
      console.log(key, value);
    }
    const response = await customFetch.patch(`/${role}/updateMe`, formdata);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to update user data');
  }
}

export async function getCurrentUser() {
  try {
    let role = Cookies.get('userRole');
    // if (!role) role = await getRole();
    if (role === 'admin') role = 'doctor';
    const response = await customFetch.get(`/${role}/me`);
    // const response = await customFetch.get(`/patient/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}

// async function getRole() {
//   try {
//     const response = await customFetch.get('/patient/no-role');
//     console.log(response.data.data);
//     return response;
//   } catch (error) {
//     console.error('Error fetching user role : ', error);
//     throw new Error('Failed to fetch user Role');
//   }
// }

export async function Userlogout() {
  let role = Cookies.get('userRole');
  if (role === 'admin') role = 'doctor';
  const res = await customFetch.post(`/${role}/logout`);
  console.log(res.data);
  Cookies.remove('userRole');
  return res.data;
}

export async function UpdateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    let role = Cookies.get('userRole');
    if (role === 'admin') role = 'doctor';

    // for (let [key, value] of formdata.entries()) {
    //   console.log(key, value);
    // }

    const response = await customFetch.patch(`/${role}/updateMyPassword`, {
      passwordCurrent,
      password,
      passwordConfirm,
    });

    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to update user password');
  }
}

export async function forgotPassword({ email }) {
  try {
    console.log('email from api :- ', email);
    const response = await customFetch.post('/patient/forgotPassword', {
      email,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Send Reset token to Email Address');
  }
}

export async function resetPassword({ password, passwordConfirm, token }) {
  try {
    const response = await customFetch.patch(
      `/patient/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      },
    );
    console.log(response.data);
    const userRole = response.data.data.model.role;
    Cookies.set('userRole', userRole, { expires: 90 });
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Reset Password');
  }
}
