const express = require('express');
const {deleteUser,createUser,getAllUsers,getUser,updateUser} = require("../controllers/userController");

const router = express.Router();
router.delete("/delete/:id",deleteUser);
router.post("/create",createUser);
router.get("/read/all",getAllUsers);
router.get("/read/:id",getUser);
router.put("/update/:id",updateUser);
module.exports = router;