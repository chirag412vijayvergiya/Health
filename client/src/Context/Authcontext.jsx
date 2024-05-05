// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error('AthContext was used outside of the AuthProvider');
//   return context;
// }

// export { AuthProvider, useAuth };
