const fs = require("fs")

const Tour = require("../models/toursModels")

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const checkId = (req, res, next, val) => {
  const tour = tours.find(
    (el) => el.id === val * 1
  )

  if (!tour) {
    return res.status(400).json({
      status: "failed",
      message: `data with ${val} this not found`,
    })
  }
  next()
}

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: `name or price are required`,
    })
  }
  next()
}

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  })
}

const getAllToursModel = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: tours.lenght,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const getTourById = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
}

const getTourByIdModel = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "aailed",
      message: err.message,
    })
  }
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  tours.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      })
    }
  )
}

const createTourModel = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const editTour = (req, res) => {
  const id = req.params.id * 1
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/dev-data/data//tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      })
    }
  )
}

const editTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const updateTour =
      await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
      })
    if (!updateTour) {
      res.status(400).json({
        status: "Failed",
        message: "Id is not found",
      })
    }
    res.status(201).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

const removeTour = (req, res) => {
  const id = req.params.id * 1
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  tours.splice(tourIndex, 1)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "delete data success",
        data: null,
      })
    }
  )
}

const removeTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const tour = await Tour.findByIdAndDelete(id)
    if (!tour) {
      res.status(400).json({
        status: "Failed",
        message: "Id is not found",
        data: null,
      })
    }
    res.status(201).json({
      status: "success",
      message: `success delete id ${id}`,
      data: null,
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllToursModel,
  getTourById,
  editTour,
  removeTour,
  createTourModel,
  checkId,
  checkBody,
  getTourByIdModel,
  editTourModel,
  removeTourModel,
}
