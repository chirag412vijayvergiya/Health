const Chat = require('../models/ChatModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  const { chatId, recipientId, recipientRole, content, attachments } = req.body;

  if (!chatId || !recipientId || !recipientRole || !content) {
    return res.status(400).json({
      message: 'chatId, recipientId, recipientModel, and content are required',
    });
  }

  try {
    const newMessage = new Message({
      sender: req.user._id,
      senderModel: req.user.role === 'patient' ? 'Patient' : 'Doctor',
      recipient: recipientId,
      recipientModel: recipientRole === 'patient' ? 'Patient' : 'Doctor',
      chat: chatId,
      content,
      attachments,
    });

    await newMessage.save();

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });

    const fullMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name')
      .populate('recipient', 'name')
      .populate('chat');

    res.status(201).json(fullMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create message', error });
  }
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  if (!chatId) {
    return res.status(400).json({ message: 'chatId is required' });
  }

  try {
    const messages = await Message.find({ chat: chatId })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name')
      .populate('recipient', 'name')
      .sort({ createdAt: -1 }); // Sort messages by creation time in ascending order

    const totalMessages = await Message.countDocuments({ chat: chatId });
    const hasMore = skip + limit < totalMessages;
    // res.status(200).json(messages);
    // Reverse the messages array so the latest message appears last
    const reversedMessages = messages.reverse();

    res
      .status(200)
      .json({ messages: reversedMessages, hasMore, totalMessages });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve messages', error });
  }
});
