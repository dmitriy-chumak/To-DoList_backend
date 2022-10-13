const Task = require('../../db/models/task')

module.exports.getAllTask = async (req, res) => {
  try {
    await Task.find().then(result => {
      res.send({data: result});
    });
  } catch (error) {
    res.status(400).json({message: 'Unknown error'});
  }
};

module.exports.createTask = async (req, res) => {
  console.log(req);
  try {
    if (req.body.text.trim() === '') {
      return res.status(400).json({message: 'Invalid input'});
    }

    const {text} = req.body;
    const task = new Task({text});
    await task.save().then(result => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
  
};

module.exports.changeTaskText = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('id')) {
      return res.status(400).json({message: 'Invalid ID'});
    }

    if (!req.body.hasOwnProperty('text') || req.body.text.trim() === '' ) {
      return res.status(415).json({message: 'Invalid input'});
    }

    const {id} = req.params;
    const newText = req.body;
    await Task.findByIdAndUpdate(id, newText, {new: true}).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(400).json(error.message);
  }

};

module.exports.changeTaskIsCheck = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({message: 'Invalid ID'});
    }

    if (!req.body.hasOwnProperty('isCheck') || typeof(req.body.isCheck) !== 'boolean') {
      return res.status(415).json({message: 'error'})
    }
    
    const check = req.body.isCheck;
    const {id} = req.params;
    await Task.findByIdAndUpdate(id, {isCheck: check}, {new: true}).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(404).json(error.message);
  }

};

module.exports.deleteTask = async (req, res) => {
  try {    
    if (!req.params.hasOwnProperty('id')) {
      return res.status(400).json({message: 'Invalid ID'});
    }
    
    const {id} = req.params;
    await Task.findByIdAndDelete(id).then(result => {
      res.status(200).json({message: 'Good'});
    });
  } catch (error) {
    res.status(400).json(error.message);
  }    
}