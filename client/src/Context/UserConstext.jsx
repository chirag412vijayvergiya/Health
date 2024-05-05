// import axios from 'axios';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';

// const UserContext = createContext();

// function UserProvier({ children }) {
//   const [user, setUser] = useState(false);
//   const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
//   useEffect(() => {
//     const token = cookies.jwt;
//     if (token) {
//       const verifyCookie = async () => {
//         try {
//           const res = await axios.get(
//             '/api/v1/patient/me',
//             // {
//             //   withCredentials: true,
//             // },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );
//           console.log(res);
//           setUser(res.data.data.name);
//         } catch (err) {
//           //   toast.error(err.message);
//           console.log(err.message);
//         }
//       };

//       verifyCookie();
//     }
//   }, [[cookies.jwt, removeCookie]]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// function useUser() {
//   const context = useContext(UserContext);
//   if (context === undefined)
//     throw new Error('AthContext was used outside of the AuthProvider');
//   return context;
// }

// export { UserProvier, useUser };
