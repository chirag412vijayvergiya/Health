import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { FaFileArrowUp, FaImages, FaVideo } from 'react-icons/fa6';
// import { MdAudiotrack } from 'react-icons/md';
import { TiAttachment } from 'react-icons/ti';
import { useState } from 'react';
import customFetch from '../../utils/customFetch';

function Attachments({
  Role,
  selectedChatId,
  receiverId,
  setMessages,
  Socket,
}) {
  const [file, setFile] = useState(null);
  const sendFileMessage = async (selectedFile) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('chatId', selectedChatId._id);
      formData.append('recipientId', receiverId._id);
      formData.append('recipientRole', receiverId.role);

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const { data } = await customFetch.post(
          `/messages/send-file-${Role}`,
          formData,
        );
        console.log('/messages/send-file :- ', data);
        Socket.emit('new message', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (err) {
        console.error('Error sending file:', err);
      } finally {
        setFile(null); // Reset file state after sending
      }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      sendFileMessage(selectedFile);
      // Reset the input value to ensure the same file can be selected again
      event.target.value = null;
    }
  };
  return (
    <Modal>
      <Menus>
        <Menus.Toggle
          icon={TiAttachment}
          className="rounded-full p-[1px] hover:bg-slate-200 dark:hover:bg-slate-800"
        />

        <Menus.List positionX={100} positionY={-123}>
          <Menus.Input
            icon={<FaImages />}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          >
            Images
          </Menus.Input>
          <Menus.Input
            icon={<FaFileArrowUp />}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          >
            File
          </Menus.Input>
          {/* <Menus.Input
            icon={<MdAudiotrack />}
            type="file"
            accept="audio/mpeg, audio/wav"
            onChange={(e) => console.log('Audio')}
          >
            Audio
          </Menus.Input> */}
          {/* <Menus.Input
            icon={<FaVideo />}
            type="file"
            accept="video/mp4, video/webm, video/ogg"
            onChange={() => console.log('Files')}
          >
            Video
          </Menus.Input> */}
        </Menus.List>
      </Menus>
    </Modal>
  );
}

export default Attachments;
