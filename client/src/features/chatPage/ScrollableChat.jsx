import React, { useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { TiAttachment } from 'react-icons/ti';
import { IoIosSend } from 'react-icons/io';
import { useUser } from '../authentication/Patients/useUser';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const ScrollableChat = ({ messages }) => {
  const { user } = useUser();

  const dummyMessages = messages;

  console.log(dummyMessages);

  const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      m.sender._id !== userId
    ) {
      return 10;
    } else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        m.sender._id !== userId) ||
      (i === messages.length - 1 && m.sender._id !== userId)
    ) {
      return 10;
    } else {
      return 'auto';
    }
  };

  const isSameUser = (messages, m, i, userId) => {
    return (
      i > 0 &&
      messages[i - 1].sender._id === m.sender._id &&
      messages[i].sender._id === userId
    );
  };

  return (
    <ScrollableFeed className="flex-1 overflow-y-scroll">
      {dummyMessages.map((m, i) => (
        <div className="flex text-sm text-grey-100" key={m._id}>
          <div
            className={`${
              m.sender._id === user.data.data._id
                ? 'rounded-l-lg bg-green-700'
                : 'rounded-r-lg bg-gray-700'
            } max-w-3/4 m-2 rounded-b-lg  p-1 `}
            style={{
              marginLeft: isSameSenderMargin(
                dummyMessages,
                m,
                i,
                user.data.data._id,
              ),
              marginTop: isSameUser(dummyMessages, m, i, user.data.data._id)
                ? '2px'
                : '5px',
            }}
          >
            {m.content ? (
              <span>{m.content}</span>
            ) : m.attachments.endsWith('.pdf') ? (
              <div className="relative">
                <a href={m.attachments} download>
                  <Document file={m.attachments}>
                    <Page pageNumber={1} width={160} />
                  </Document>
                </a>
                {/* <a
                  href={m.attachments}
                  download
                  className="absolute bottom-0 right-0 m-2 text-xs text-blue-100 underline"
                >
                  Download PDF
                </a> */}
              </div>
            ) : (
              <div className="relative">
                <a href={m.attachments} download>
                  <img
                    src={m.attachments}
                    alt="attachment"
                    className="h-40 w-40 object-cover"
                  />
                </a>
                {/* <a
                  href={m.attachments}
                  download
                  className="absolute bottom-0 right-0 m-2 text-xs text-blue-100 underline"
                >
                  Download
                </a> */}
              </div>
            )}
            <span className="flex justify-end px-2 pb-0  text-[0.55rem] text-blue-100">
              {new Intl.DateTimeFormat('default', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }).format(new Date(m.createdAt))}

              {m.attachments ? (
                m.attachments?.endsWith('.pdf') ? (
                  <a href={m.attachments} download>
                    <IoIosSend className="ml-4 mt-[0.1rem] h-[1rem] w-[1rem] text-indigo-200" />
                  </a>
                ) : (
                  <a href={m.attachments} download>
                    <TiAttachment className="ml-4 mt-[0.1rem] h-[1rem] w-[1rem] text-indigo-200" />
                  </a>
                )
              ) : null}
            </span>
          </div>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
