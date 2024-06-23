import { useEffect, useState } from 'react';
import { useChat } from '../../Context/ChatContext';
import customFetch from '../../utils/customFetch';

function Userprofile({ user, onUserClick }) {
  const { selectedChatId, setselectedChatId, chats, setChats, setreceiverId } =
    useChat();
  const [isUserInSelectedChat, setIsUserInSelectedChat] = useState(false);

  const accessChat = async (userId, userModel, userRole) => {
    console.log(userId, userRole);
    // setLoadingChat(true);
    try {
      const userIdobj = { userId, userRole };
      const endpoint =
        userRole === 'patient' ? '/chats/doctor-chat' : '/chats/patient-chat';
      const { data } = await customFetch.post(endpoint, userIdobj);
      console.log(data);

      if (!chats || !chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setselectedChatId(data);
      setreceiverId(user);
      if (onUserClick) {
        onUserClick(true);
      } // Setting receiverId after accessing the chat
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      const isInChat = selectedChatId.users.some((u) => u.user === user._id);
      setIsUserInSelectedChat(isInChat);
    }
  }, [selectedChatId, user._id]);

  return (
    <div
      className={`mb-1 flex w-full cursor-pointer rounded-md p-3 pr-0 hover:bg-gray-700 hover:text-grey-200 hover:dark:bg-grey-300 hover:dark:text-slate-800 ${
        isUserInSelectedChat
          ? 'bg-slate-800 text-grey-200 shadow-xl shadow-green-500 dark:bg-grey-200 dark:text-gray-800 dark:shadow-green-700'
          : 'bg-grey-200 dark:bg-slate-800 dark:text-grey-200'
      }`}
      onClick={() => accessChat(user._id, user.role, user.role)}
    >
      <img className="h-10 w-10 rounded-full" src={user?.photo} alt="user" />
      <div className="ml-3 flex flex-col justify-between">
        <h1 className="text-base font-semibold">{user.name}</h1>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

export default Userprofile;
