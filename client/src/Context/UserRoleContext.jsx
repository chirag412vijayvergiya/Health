// // import axios from 'axios';
// import { createContext, useContext, useState } from 'react';
// // import { useCookies } from 'react-cookie';

// const UserContext = createContext();

// // 2. Provide the context
// function UserProvider({ children }) {
//   const [userRole, setUserRole] = useState(null);

//   return (
//     <UserContext.Provider value={{ userRole, setUserRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
// function useUserRole() {
//   const context = useContext(UserContext);
//   if (context === undefined)
//     throw new Error('AthContext was used outside of the AuthProvider');
//   return context;
// }

// export { UserProvider, useUserRole };
