var express = require('express');
var router = express.Router();
const userModel = require("../model/user")
const user = require("../controller/controller")

router.get('/', user.findAll);
router.post('/add_user', user.create);
router.put('/update_user/:id',user.update);
router.delete('/delete_user/:id',user.delete);

module.exports = router;
