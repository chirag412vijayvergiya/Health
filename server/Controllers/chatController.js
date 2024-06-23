const catchAsync = require('../utils/catchAsync');
const Chat = require('../models/ChatModel');

exports.accessChat = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { userId, userRole } = req.body;

  const userModel = userRole === 'patient' ? 'Patient' : 'Doctor';
  const requestModel = req.user.role === 'patient' ? 'Patient' : 'Doctor';
  if (!userId || !userModel) {
    return res
      .status(400)
      .json({ message: 'userId and userModel are required' });
  }

  try {
    const chats = await Chat.find({
      $and: [
        { 'users.user': req.user._id },
        { 'users.user': userId },
        { 'users.userModel': requestModel },
        { 'users.userModel': userModel },
      ],
    });
    // .populate('users.user')
    // .populate('latestMessage');

    if (chats.length > 0) {
      res.status(200).json(chats[0]);
    } else {
      // If no chat is found, create a new chat
      const newChat = {
        chatName: 'sender',
        users: [
          { user: req.user._id, userModel: requestModel },
          { user: userId, userModel },
        ],
      };

      const createdChat = await Chat.create(newChat);
      const fullChat = await Chat.findById(createdChat._id)
        .populate('users.user', 'name')
        .populate('latestMessage');

      res.status(201).json(fullChat);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to access chat', error });
  }
});
