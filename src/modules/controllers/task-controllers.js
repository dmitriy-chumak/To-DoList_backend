const Task = require('../../models/task')
const { validationText, validationIsCheck } = require('../../helpers/validator')

const getAllTask = (req, res) => {
  try {
      Task.find().sort({'isCheck': 1}).then(result => {
      res.status(200).send({ data: result });
    });
  } catch (error) {
    res.status(400).send({message: 'Failed to get tasks'});
  }
};

const createTask = (req, res) => {
  try {
    if (validationText(req.body.text)) {
      throw new Error();
    }

    const { text } = req.body;
    const task = new Task({ text });
    task.save().then(result => {
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(400).send({message: 'Create failed'});
  }
};

const changeTaskText = (req, res) => {
  try {
    if (!req.body.hasOwnProperty('text') || validationText(req.body.text)) {
      throw new Error();
    }

    const { id } = req.params;
    const newText = req.body;
    Task.findByIdAndUpdate(
      id, 
      newText, 
      { new: true }
    ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ message: 'Error change text' });
  }
};

const changeTaskIsCheck = (req, res) => {
  try {
    if (!req.body.hasOwnProperty('isCheck') || !validationIsCheck(req.body.isCheck)) {
      throw new Error();
    }

    const check = req.body.isCheck;
    const { id } = req.params;
    Task.findByIdAndUpdate(
      id, 
      { isCheck: check }, 
      { new: true }
    ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ message: 'Error change' });
  }
};

const deleteTask = (req, res) => {
  try {     
    const { id } = req.params;
    Task.deleteOne({ _id: id }).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ message: 'Error delete' });
  }    
}

const deleteAll = (req, res) => {
  try {
    Task.deleteMany().then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ message: 'Error delete tasks' });
  }
}

module.exports = {
  getAllTask,
  createTask,
  changeTaskText,
  changeTaskIsCheck,
  deleteTask,
  deleteAll,
};