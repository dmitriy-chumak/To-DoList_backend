const Task = require('../../models/task')

const getAllTask = async (req, res) => {
  try {
    await Task.find().then(result => {
      res.status(200).send({data: result});
    });
  } catch (error) {
    res.status(400).json({message: 'Unknown error'});
  }
};

const createTask = async (req, res) => {
  try {
    if (req.body.text.trim() === '') {
      throw new Error();
    }

    const { text } = req.body;
    const task = new Task({ text });
    await task.save().then(result => {
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(400).json({message: 'Create failed'});
  }
};

const changeTaskText = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('id')) {
      throw new Error();
    }

    if (!req.body.hasOwnProperty('text') || req.body.text.trim() === '' ) {
      throw new Error();
    }

    const {id} = req.params;
    const newText = req.body;
    await Task.findByIdAndUpdate(
      id, 
      newText, 
      {new: true}
    ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).json({message: 'Error'});
  }
};

const changeTaskIsCheck = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty("_id")) {
      throw new Error();
    }

    if (!req.body.hasOwnProperty('isCheck') || typeof(req.body.isCheck) !== 'boolean') {
      throw new Error();
    }
    
    const check = req.body.isCheck;
    const { id } = req.params;
    await Task.findByIdAndUpdate(
      id, 
      {isCheck: check}, 
      {new: true}
      ).then(result => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).json({message: 'Error change'});
  }
};

const deleteTask = async (req, res) => {
  try {    
    if (!req.params.hasOwnProperty('id')) {
      throw new Error();
    }
    
    const {id} = req.params;
    await Task.findByIdAndDelete(id).then(result => {
      res.status(200).json({data}); // in process
    });
  } catch (error) {
    res.status(400).json({message: 'Error delete'});
  }    
}

module.exports = {
  getAllTask,
  createTask,
  changeTaskText,
  changeTaskIsCheck,
  deleteTask
};