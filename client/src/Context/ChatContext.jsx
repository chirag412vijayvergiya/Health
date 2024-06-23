import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useUser } from '../features/authentication/Patients/useUser';
import DefaultSpinner from '../ui/DefaultSpinner';

// Define the new context
const ChatContext = createContext();

function ChatProvider({ children }) {
  const { user, isLoading, isError } = useUser();
  const [selectedChatId, setselectedChatId] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [receiverId, setreceiverId] = useState();
  const [chatVisible, setChatVisible] = useState(false);
  if (isLoading) return <DefaultSpinner />;

  if (isError) {
    return <div>Error loading user data</div>;
  }

  return (
    <ChatContext.Provider
      value={{
        user,
        selectedChatId,
        setselectedChatId,
        chats,
        setChats,
        notification,
        setNotification,
        receiverId,
        setreceiverId,
        chatVisible,
        setChatVisible,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Custom Hook
function useChat() {
  const context = useContext(ChatContext);
  // console.log(context);
  if (context === undefined)
    throw new Error('ChatContext was used outside of ChatProvider');
  return context;
}
export { ChatProvider, useChat };
