const Task = require('../../models/task')
const { validationText, validationIsCheck } = require('../../helpers/validator')

const getAllTask = async (req, res) => {
  try {
    await Task.find().then(result => {
      res.status(200).send({ data: result });
    });
  } catch (error) {
    res.status(400).json({message: 'Unknown error'});
  }
};

const createTask = async (req, res) => {
  try {
    if (validationText(req.body.text)) {
      throw new Error();
    }

    const { text } = req.body;
    const task = new Task({ text });
    await task.save().then(result => {
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(400).send({message: 'Create failed'});
  }
};

const changeTaskText = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('id') || !req.body.hasOwnProperty('text') || validationText(req.body.text)) {
      throw new Error();
    }

    const { id } = req.params;
    const newText = req.body;
    await Task.findByIdAndUpdate(
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

const changeTaskIsCheck = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('id') || !req.body.hasOwnProperty('isCheck') || validationIsCheck(req.body.isCheck)) {
      throw new Error();
    }

    const check = req.body.isCheck;
    const { id } = req.params;
    await Task.findByIdAndUpdate(
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

const deleteTask = async (req, res) => {
  try {    
    if (!req.params.hasOwnProperty('id')) {
      throw new Error();
    }
    
    const { id } = req.params;
    await Task.deleteOne({ _id: id }).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ message: 'Error delete' });
  }    
}

module.exports = {
  getAllTask,
  createTask,
  changeTaskText,
  changeTaskIsCheck,
  deleteTask
};