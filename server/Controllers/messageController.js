const Chat = require('../models/ChatModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const AppError = require('../utils/AppError');

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
// Adjust the path as necessary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image');
    return {
      folder: 'chats',
      format: isImage ? 'jpeg' : undefined, // Keep original format for PDFs
      public_id: `chat-${req.user.id}-${Date.now()}`,
      transformation: isImage
        ? [{ width: 500, height: 500, crop: 'limit', quality: 'auto' }]
        : undefined,
    };
  },
});

// ******************************************************************************* //

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not a valid file type! Please upload only images or PDFs.',
        404,
      ),
      false,
    );
  }
};

// ******************************************************************************* //

const upload = multer({ storage: cloudinaryStorage, fileFilter: multerFilter });

exports.uploadChatImages = upload.single('file'); // Accept multiple files

exports.createMessageFiles = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { chatId, recipientId, recipientRole } = req.body;

  if (!chatId || !recipientId || !recipientRole) {
    return res.status(400).json({
      message: 'chatId, recipientId, and recipientModel are required',
    });
  }

  try {
    const newMessage = new Message({
      sender: req.user._id,
      senderModel: req.user.role === 'patient' ? 'Patient' : 'Doctor',
      recipient: recipientId,
      recipientModel: recipientRole === 'patient' ? 'Patient' : 'Doctor',
      chat: chatId,
      attachments: req.file.path,
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
