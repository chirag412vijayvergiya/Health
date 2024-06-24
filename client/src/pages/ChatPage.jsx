import React, { useEffect, useState } from 'react';
import SEO from '../ui/SEO';

import { useUser } from '../features/authentication/Patients/useUser';
import DefaultSpinner from '../ui/DefaultSpinner';

import SideDrawer from '../features/chatPage/SideDrawer';
import ChatSection from '../features/chatPage/ChatSection';
import { useChat } from '../Context/ChatContext';

function ChatPage() {
  const { user, isPending: isPending1, isAuthenticated } = useUser();
  const { selectedChatId, chatVisible, setChatVisible } = useChat();
  if (isPending1) return <DefaultSpinner />;

  const openChat = (chatId) => {
    // setSelectedChatId(chatId);
    setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
  };
  return (
    <>
      <SEO
        title="chat"
        description="chat page description"
        keywords="chat, chat page, chat description"
        author="Chirag Vijayvergiya"
      />
      <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] overflow-scroll rounded-xl border-r border-r-grey-200 bg-slate-200 px-1 py-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 sm:px-4 md:m-[2vh]">
        <div className="w-full sm:flex sm:flex-col">
          <div className="flex items-center justify-between">
            <h1 className="mx-auto mb-3 text-lg font-semibold sm:m-5">
              One to One Message
            </h1>
          </div>
          <div className="flex w-full">
            {window.innerWidth <= 768 ? (
              !chatVisible && (
                <SideDrawer Role={user.data.data.role} onUserClick={openChat} />
              )
            ) : (
              <SideDrawer Role={user.data.data.role} />
            )}
            {/* {chatVisible && selectedChatId && (window.innerWidth <= 768 || ) && (
              <ChatSection user={user} onBack={closeChat} />
              )} */}

            {window.innerWidth <= 768 ? (
              chatVisible &&
              selectedChatId && <ChatSection user={user} onBack={closeChat} />
            ) : (
              <ChatSection user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
