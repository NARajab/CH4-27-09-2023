const fs = require("fs")

// USER
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data//users.json`
  )
)

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "succes",
    requestTime: req.requestTime,
    data: {
      users,
    },
  })
}

const getUserById = (req, res) => {
  const id = req.params.id
  const user = users.find((el) => el._id === id)

  if (!user) {
    return res.status(400).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
}

const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  users.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          user: newData,
        },
      })
    }
  )
}

const editUser = (req, res) => {
  const id = req.params.id
  const userIndex = users.findIndex(
    (el) => el._id === id
  )

  if (userIndex === -1) {
    return res.status(400).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }
  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          user: users[userIndex],
        },
      })
    }
  )
}

const removeUser = (req, res) => {
  const id = req.params._id
  const userIndex = users.findIndex(
    (el) => el.id === id
  )

  if (userIndex === -1) {
    return res.status(400).json({
      status: "failed",
      message: "data not found",
    })
  }

  users.splice(userIndex, 1)

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "delete data success",
        data: null,
      })
    }
  )
}

module.exports = {
  getAllUsers,
  getUserById,
  editUser,
  removeUser,
  createUser,
}
