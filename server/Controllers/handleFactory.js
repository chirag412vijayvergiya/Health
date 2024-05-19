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
/*
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
  */

exports.getAll = (Model, selectFields = '', populateOptions = []) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();

    // Select specific fields if provided
    if (selectFields) {
      query = query.select(selectFields);
    }

    // Populate specified fields if provided
    populateOptions.forEach((option) => {
      query = query.populate(option);
    });

    const docs = await query;

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs,
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
/*
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.params.id);
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document find with that ID', 404));
    }
    // console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
  */

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      if (Array.isArray(popOptions)) {
        popOptions.forEach((option) => {
          // console.log(`Populating option ${index}: `, option);
          query = query.populate(option);
        });
      } else {
        // console.log('Populating single option: ', popOptions);
        query = query.populate(popOptions);
      }
    }

    // console.log('Query after population options:', query);
    const doc = await query;

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

// Usage

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
