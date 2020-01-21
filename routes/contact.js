
const express = require('express');
const router = express.Router();

// @route     GET  api/contact
// @desc      Get contacts of logged in user
// @access    Private
router.get('/',(req,res) => {
    res.send("Get all contacts");

});

// @route     POST  api/contact
// @desc      Add contacts of logged in user
// @access    Private
router.post('/',(req,res) => {
    res.send("Add contacts");

});

// @route     PUT  api/contact/:id
// @desc      Update contacts of logged in user
// @access    Private
router.put('/:id',(req,res) => {
    res.send("Update contacts");

});

// @route     DELETE  api/contact/:id
// @desc      Delete contacts of logged in user
// @access    Private
router.delete('/:id',(req,res) => {
    res.send("Delete contacts");

});
module.exports = router;