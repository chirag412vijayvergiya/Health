const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// ******************************************************************************* //

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

// ******************************************************************************* //

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// ******************************************************************************* //

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document find with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// ******************************************************************************* //
//Route.delete() requires a callback function but got a [object Undefined
// exports.deleteOne = (Model) => { // because of this {} this is not running
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndDelete(req.params.id);

//     if (!doc) {
//       return next(AppError('No document found with that ID', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: null,
//     });
//   });
// };

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// ********************************************************************************* //
