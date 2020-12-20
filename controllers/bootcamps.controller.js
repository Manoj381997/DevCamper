const Bootcamp = require('../models/Bootcamp.model');

// @desc    GET All bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      message: 'Retrieved All Bootcamps',
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Couldn't retrieve bootcamps`,
      error: err.message,
    });
  }
};

// @desc    GET Single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: 'Requested bootcamp could not be found',
        error: 'Invalid Bootcamp',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Retrieved Bootcamp',
      data: bootcamp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Couldn't retrieve bootcamp`,
      error: err.message,
    });
  }
};

// @desc    POST Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Bootcamp created successfully',
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Couldn't create bootcamp`,
      error: err.message,
    });
  }
};

// @desc    PUT Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: 'Bootcamp could not be found',
        error: 'Invalid Bootcamp',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bootcamp updated successfully',
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Couldn't update bootcamp`,
      error: err.message,
    });
  }
};

// @desc    DELETE Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: 'Bootcamp could not be found',
        error: 'Invalid Bootcamp',
      });
    }

    res.status(204).json({
      success: true,
      message: 'Bootcamp deleted successfully',
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Couldn't delete bootcamp`,
      error: err.message,
    });
  }
};
