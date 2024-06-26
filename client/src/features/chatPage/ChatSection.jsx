// import { useState, useEffect, useRef, useCallback } from 'react';
// import { io } from 'socket.io-client';
// import customFetch from '../../utils/customFetch';
// import { IoIosSend } from 'react-icons/io';
// import ScrollableChat from './ScrollableChat';
// import { useChat } from '../../Context/ChatContext';
// import SpinnerMini from '../../ui/SpinnerMini';

// import Attachments from './Attachments';

// const ENDPOINT = `${import.meta.env.VITE_BACKEND_API_BASE_URL}`; // Adjust this as needed
// // const ENDPOINT = 'http://localhost:8000';
// let socket, selectedChatCompare;

// function ChatSection({ user, onBack }) {
//   const Role = user.data.data.role === 'patient' ? 'patient' : 'doctor';

//   const { selectedChatId, receiverId } = useChat();
//   const [isTyping, setIsTyping] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [newMessage, setNewMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // Ref for the chat container
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     socket = io(ENDPOINT, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//     });
//     socket.emit('setup', user.data.data);
//     socket.on('connected', () => setSocketConnected(true));
//     socket.on('typing', () => setIsTyping(true));
//     socket.on('stop typing', () => setIsTyping(false));

//     return () => {
//       socket.disconnect();
//       socket = null;
//     };
//   }, [user]);

//   const fetchMessages = useCallback(async () => {
//     if (selectedChatId) {
//       setLoading(true);
//       try {
//         const { data } = await customFetch.get(
//           `/messages/${Role}/${selectedChatId._id}?page=${page}`,
//         );
//         console.log('/messages/:role/:chatId :- ', data);
//         // setMessages((prevMessages) => [...data.messages, ...prevMessages]);
//         setMessages((prevMessages) => {
//           // Check if the messages are already in the state to avoid duplicates
//           const newMessages = data.messages.filter(
//             (msg) => !prevMessages.some((prevMsg) => prevMsg._id === msg._id),
//           );
//           return [...newMessages, ...prevMessages];
//         });
//         setHasMore(data.hasMore);
//         socket.emit('join chat', selectedChatId._id);
//       } catch (error) {
//         console.error('Error fetching messages:', error.message);
//       }
//       setLoading(false);
//     }
//   }, [selectedChatId, Role, page]);

//   useEffect(() => {
//     // Reset the state when the selectedChatId changes
//     setMessages([]);
//     setPage(1);
//     setHasMore(true);
//     fetchMessages();
//     selectedChatCompare = selectedChatId;
//   }, [selectedChatId, fetchMessages]);

//   useEffect(() => {
//     if (page > 1) {
//       fetchMessages();
//     }
//   }, [page, fetchMessages]);

//   useEffect(() => {
//     socket.on('message received', (newMessageReceived) => {
//       // Handle the new message received from the server
//       console.log('New message received on client:', newMessageReceived);

//       // Update messages state when a new message is received
//       // setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
//       setMessages((prevMessages) => {
//         // Check if the message already exists to avoid duplicates
//         if (prevMessages.some((msg) => msg._id === newMessageReceived._id)) {
//           return prevMessages;
//         }
//         return [...prevMessages, newMessageReceived];
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       const { current: container } = chatContainerRef;
//       // Scroll to the bottom of the chat container
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async (event) => {
//     if (event.key === 'Enter' && newMessage) {
//       socket.emit('stop typing', selectedChatId._id);
//       try {
//         const { data } = await customFetch.post(
//           `/messages/send-message-${Role}`,
//           {
//             content: newMessage,
//             chatId: selectedChatId._id,
//             recipientId: receiverId._id,
//             recipientRole: receiverId.role,
//           },
//         );
//         console.log('/messages/send-message :- ', data);
//         const newMsg = data;
//         socket.emit('new message', newMsg);
//         setMessages((prevMessages) => [...prevMessages, newMsg]);
//         setNewMessage('');
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   let lastTypingTime;
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);
//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit('typing', selectedChatId._id);
//     }

//     lastTypingTime = new Date().getTime();
//     const timerLength = 5000;
//     setTimeout(() => {
//       const timeNow = new Date().getTime();
//       const timeDiff = timeNow - lastTypingTime;
//       if (typing && timeDiff >= timerLength) {
//         socket.emit('stop typing', selectedChatId._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   const handleScroll = () => {
//     if (chatContainerRef.current) {
//       const { scrollTop } = chatContainerRef.current;
//       if (scrollTop === 0 && hasMore && !loading) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }
//   };

//   return (
//     <div className="relative mt-0 flex h-[74vh] flex-col rounded-xl border border-gray-200 bg-gray-300 bg-[url('/Wplight.png')] font-mono dark:border-gray-800 dark:bg-slate-900 dark:bg-[url('/wp.jpg')] sm:m-1 sm:w-9/12">
//       {selectedChatId ? (
//         <>
//           <div className="sticky top-0 z-10 flex items-center border-b border-slate-200 py-3 pl-5 dark:border-slate-800">
//             <div className="flex w-full flex-row items-center rounded-md">
//               <img
//                 className="h-10 w-10 rounded-full"
//                 src={receiverId?.photo}
//                 alt="user"
//               />
//               <div className="ml-3 flex flex-col">
//                 <h1 className="text-base font-semibold text-gray-800 dark:text-gray-100">
//                   {receiverId?.name}
//                 </h1>
//                 {isTyping && (
//                   <p className="text-xs text-gray-800 dark:text-green-300">
//                     Typing...
//                   </p>
//                 )}
//               </div>
//               <button
//                 className="ml-12 items-center justify-end rounded-md border-2  border-l-0 border-r-0 border-t-0 border-b-indigo-500 text-lg font-semibold text-indigo-600 transition-colors hover:text-indigo-700 sm:hidden"
//                 onClick={onBack}
//               >
//                 &larr; Back
//               </button>
//             </div>
//           </div>

//           <div
//             className="flex-1 overflow-y-scroll"
//             ref={chatContainerRef}
//             onScroll={handleScroll}
//           >
//             {loading ? <SpinnerMini /> : <ScrollableChat messages={messages} />}
//           </div>
//           <div className="sticky bottom-0 flex w-full items-center p-2">
//             <div className="mr-2 flex flex-grow items-center rounded-3xl border border-gray-400 p-2 pl-2 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
//               <Attachments
//                 Role={Role}
//                 selectedChatId={selectedChatId}
//                 receiverId={receiverId}
//                 setMessages={setMessages}
//                 Socket={socket}
//               />
//               <input
//                 type="text"
//                 className="flex-grow bg-transparent px-4 outline-none"
//                 placeholder="Enter message..."
//                 value={newMessage}
//                 onChange={typingHandler}
//                 onKeyDown={sendMessage}
//               />
//             </div>
//             <button
//               className="rounded-full bg-indigo-500 p-2 text-white hover:bg-indigo-600"
//               onClick={() => sendMessage({ key: 'Enter' })}
//             >
//               <IoIosSend className="h-[1.4rem] w-[1.4rem]" />
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex h-full w-full items-center justify-center">
//           <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//             Select a user to start messaging
//           </h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatSection;

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import customFetch from '../../utils/customFetch';
import { IoIosSend } from 'react-icons/io';
import ScrollableChat from './ScrollableChat';
import { useChat } from '../../Context/ChatContext';
import SpinnerMini from '../../ui/SpinnerMini';

import Attachments from './Attachments';
import { useGetMessages } from './useGetMessages';
import { useSendMessage } from './useSendMessage';
import { useSendFileMessage } from './useSendFileMessages';

// const ENDPOINT = `${import.meta.env.VITE_BACKEND_API_BASE_URL}`; // Adjust this as needed
const ENDPOINT = 'http://localhost:8000';
let socket, selectedChatCompare;

function ChatSection({ user, onBack }) {
  const Role = user.data.data.role === 'patient' ? 'patient' : 'doctor';

  const { selectedChatId, receiverId } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Ref for the chat container
  const chatContainerRef = useRef(null);
  const { data, isLoading, refetch } = useGetMessages({
    Role,
    page,
    selectedChatId,
  });

  const { isSending: isSending1, sendMessages } = useSendMessage();
  const { isSending: isSending2 } = useSendFileMessage();

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    socket.emit('setup', user.data.data);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    return () => {
      socket.disconnect();
      socket = null;
    };
  }, [user]);

  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => {
        const newMessages = data.messages.filter(
          (msg) => !prevMessages.some((prevMsg) => prevMsg._id === msg._id),
        );
        return [...newMessages, ...prevMessages];
      });
      setHasMore(data.hasMore);
      socket.emit('join chat', selectedChatId._id);
    }
  }, [data, selectedChatId]);

  useEffect(() => {
    // Reset the state when the selectedChatId changes
    setMessages([]);
    setPage(1);
    setHasMore(true);
    if (selectedChatId) {
      socket.emit('join chat', selectedChatId._id);
    }
    selectedChatCompare = selectedChatId;
  }, [selectedChatId]);

  useEffect(() => {
    if (page > 1) {
      refetch();
    }
  }, [page, refetch]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      // Handle the new message received from the server
      console.log('New message received on client:', newMessageReceived);

      // Update messages state when a new message is received
      // setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      setMessages((prevMessages) => {
        // Check if the message already exists to avoid duplicates
        if (prevMessages.some((msg) => msg._id === newMessageReceived._id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessageReceived];
      });
    });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { current: container } = chatContainerRef;
      // Scroll to the bottom of the chat container
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChatId._id);
      sendMessages(
        {
          Role,
          content: newMessage,
          chatId: selectedChatId._id,
          recipientId: receiverId._id,
          recipientRole: receiverId.role,
        },
        {
          onSuccess: (data) => {
            console.log('/messages/send-file :- ', data);
            socket.emit('new message', data);
            setMessages((prevMessages) => [...prevMessages, data]);
          },
          onError: (err) => {
            console.error('Error sending file:', err);
          },
          onSettled: () => {
            setNewMessage(''); // Reset file state after sending
          },
        },
      );
    }
  };

  let lastTypingTime;
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChatId._id);
    }

    lastTypingTime = new Date().getTime();
    const timerLength = 5000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (typing && timeDiff >= timerLength) {
        socket.emit('stop typing', selectedChatId._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (scrollTop === 0 && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <div className="relative mt-0 flex h-[74vh] w-full flex-col rounded-xl border border-gray-200 bg-gray-300 bg-[url('/Wplight.png')] font-mono dark:border-gray-800 dark:bg-slate-900 dark:bg-[url('/wp.jpg')] sm:m-1 sm:w-9/12">
      {selectedChatId ? (
        <>
          <div className="sticky top-0 z-10 flex items-center border-b border-slate-200 py-3 pl-5 dark:border-slate-800">
            <div className="flex w-full flex-row items-center rounded-md">
              <img
                className="h-10 w-10 rounded-full"
                src={receiverId?.photo}
                alt="user"
              />
              <div className="ml-3 flex flex-col">
                <h1 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                  {receiverId?.name}
                </h1>
                {isTyping && (
                  <p className="text-xs text-gray-800 dark:text-green-300">
                    Typing...
                  </p>
                )}
              </div>
              <button
                className="ml-12 items-center justify-end rounded-md border-2  border-l-0 border-r-0 border-t-0 border-b-indigo-500 text-lg font-semibold text-indigo-600 transition-colors hover:text-indigo-700 sm:hidden"
                onClick={onBack}
              >
                &larr; Back
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-scroll"
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {isLoading ? (
              <SpinnerMini />
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </div>
          <div className="sticky bottom-0 flex w-full items-center p-2">
            <div className="mr-2 flex flex-grow items-center rounded-3xl border border-gray-400 p-2 pl-2 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
              <Attachments
                Role={Role}
                selectedChatId={selectedChatId}
                receiverId={receiverId}
                setMessages={setMessages}
                Socket={socket}
                isSending1={isSending1}
              />
              <input
                type="text"
                className="flex-grow bg-transparent px-4 outline-none"
                placeholder="Enter message..."
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
              />
            </div>
            <button
              className="rounded-full bg-indigo-500 p-2 text-white hover:bg-indigo-600 disabled:cursor-not-allowed"
              onClick={() => sendMessage({ key: 'Enter' })}
              disabled={isSending1 || isSending2}
            >
              <IoIosSend className="h-[1.4rem] w-[1.4rem]" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Select a user to start messaging
          </h1>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
