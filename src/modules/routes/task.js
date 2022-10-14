const express = require("express")
const router = express.Router();

const {
  getAllTask,
  createTask,
  changeTaskIsCheck,
  deleteTask,
  changeTaskText
} = require("../controllers/task-controllers");

router.get('/tasks', getAllTask);
router.post('/tasks', createTask);
router.patch('/tasks/text/:id', changeTaskText);
router.patch('/tasks/ischeck/:id', changeTaskIsCheck);
router.delete('/tasks/:id', deleteTask);

module.exports = router;