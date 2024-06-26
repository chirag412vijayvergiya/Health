const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const AppError = require('../utils/AppError');
const patient = require('../models/patientModel');
const doctor = require('../models/doctorModel');
const catchAsync = require('../utils/catchAsync');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Image will store as a buffer
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users',
    format: async (req) => 'jpeg',
    public_id: (req) => `user-${req.user.id}-${Date.now()}`,
    transformation: [
      { width: 500, height: 500, crop: 'limit', quality: 'auto' },
    ],
  },
});

// ******************************************************************************* //

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // console.log('Not an image! Please upload only image.');
    cb(new AppError('Not an image! Please upload only image.', 404), false);
  }
};

// ******************************************************************************* //

const upload = multer({ storage: cloudinaryStorage, fileFilter: multerFilter });
exports.uploadUserPhoto = upload.single('photo');

// ******************************************************************************* //

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateMe = catchAsync(async (req, res, model, next) => {
  // console.log('req from update :- ', req);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filteredObj(req.body, 'name', 'gender');
  console.log(req.file);
  if (req.file) filteredBody.photo = req.file.path;
  const updatedUser = await model.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.updateMeDoctor = catchAsync(async (req, res, next) => {
  updateMe(req, res, doctor, next);
});

exports.updateMePatient = catchAsync(async (req, res, next) => {
  updateMe(req, res, patient, next);
});

exports.getMe = (req, res, next) => {
  //   console.log(req.user.id);
  // console.log(req);
  req.params.id = req.user.id;
  //   console.log(req.params.id);
  // console.log(req.params.id);
  next();
};

const deleteMe = async (req, res, model, next) => {
  await model.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.deleteMeDoctor = catchAsync(async (req, res, next) => {
  await deleteMe(req, res, doctor, next);
});

exports.deleteMePatient = catchAsync(async (req, res, next) => {
  await deleteMe(req, res, patient, next);
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};
