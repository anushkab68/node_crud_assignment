var express = require('express');
var router = express.Router();
const userModel = require("../model/user")

router.get('/', function(req, res, next) {
  const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    const user = new userModel(req.body);

    userModel.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the record"
        });
      });
});

router.post('/add_user', function (req, res,next){
  console.log(req.body)
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const user = new userModel({
    name:req.body.name,
    age:req.body.age,
    gender:req.body.gender,
    phone:req.body.phone
  });
  console.log(user)

  user.save(user).then(data =>{
    console.log(data);
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
    message:
      err.message || "Some error occurred while creating the record."
  });
});
});


router.put('/update_user/:id', function (req, res,next){
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "data cannot be empty!" });
    return;
  }
      const id = req.params.id;
    const user = new userModel
    userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update record with id=${id}.`
          });
        } else res.send({ message: "record was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating record with id=" + id
        });
      });
});


router.delete('/delete_user/:id', function (req, res,next){
  const id = req.params.id;

  userModel.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete record with id=${id}.`
        });
      } else {
        res.send({
          message: "Record was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete record with id=" + id
      });
    });
});

module.exports = router;
