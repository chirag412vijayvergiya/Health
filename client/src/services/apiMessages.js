import customFetch from '../utils/customFetch';

export async function sendFileMessage({
  Role,
  file,
  chatId,
  recipientId,
  recipientRole,
}) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('chatId', chatId);
    formData.append('recipientId', recipientId);
    formData.append('recipientRole', recipientRole);
    const response = await customFetch.post(
      `/messages/send-file-${Role}`,
      formData,
    );
    // console.log('/messages/send-file :- ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending file: ', error);
    throw new Error('Failed to send file');
  }
}

export async function sendMessage({
  Role,
  content,
  chatId,
  recipientId,
  recipientRole,
}) {
  try {
    console.log(Role, content, chatId, recipientId, recipientRole);

    const response = await customFetch.post(`/messages/send-message-${Role}`, {
      content,
      chatId,
      recipientId,
      recipientRole,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message: ', error);
    throw new Error('Failed to send message');
  }
}

export async function GetMessages({ Role, page, selectedChatId }) {
  try {
    const response = await customFetch.get(
      `/messages/${Role}/${selectedChatId._id}?page=${page}`,
    );

    return response.data;
  } catch (err) {
    console.error('Error getting Data: ', err);
    throw new Error('Failed to getting Data');
  }
}
