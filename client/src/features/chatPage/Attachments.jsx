import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { FaFileArrowUp, FaImages, FaVideo } from 'react-icons/fa6';
// import { MdAudiotrack } from 'react-icons/md';
import { TiAttachment } from 'react-icons/ti';
import { useState } from 'react';
import { useSendFileMessage } from './useSendFileMessages';

function Attachments({
  Role,
  selectedChatId,
  receiverId,
  setMessages,
  Socket,
  isSending1,
}) {
  const [file, setFile] = useState(null);
  const { isSending, sendFile } = useSendFileMessage();
  const sendFileMessage = async (selectedFile) => {
    sendFile(
      {
        Role,
        file: selectedFile,
        chatId: selectedChatId._id,
        recipientId: receiverId._id,
        recipientRole: receiverId.role,
      },
      {
        onSuccess: (data) => {
          console.log('/messages/send-file :- ', data);
          Socket.emit('new message', data);
          setMessages((prevMessages) => [...prevMessages, data]);
        },
        onError: (err) => {
          console.error('Error sending file:', err);
        },
        onSettled: () => {
          setFile(null); // Reset file state after sending
        },
      },
    );
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      sendFileMessage(selectedFile);
      event.target.value = null;
    }
  };
  return (
    <Modal>
      <Menus>
        <Menus.Toggle
          icon={TiAttachment}
          className="rounded-full p-[1px] hover:bg-slate-200 dark:hover:bg-slate-800"
          disabled={isSending || isSending1}
        />

        <Menus.List positionX={100} positionY={-123}>
          <Menus.Input
            icon={<FaImages />}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSending || isSending1}
          >
            Images
          </Menus.Input>
          <Menus.Input
            icon={<FaFileArrowUp />}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isSending || isSending1}
          >
            File
          </Menus.Input>
        </Menus.List>
      </Menus>
    </Modal>
  );
}

export default Attachments;
