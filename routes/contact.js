const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route     GET  api/contact
// @desc      Get contacts of logged in user
// @access    Private
//since it's a protected route we're adding 'auth' middleware
router.get("/", auth, async (req, res) => {
  try {
    //fetching the contacts array(JSON) from mongoDB using ID attached to request object and sorting them to show most recent one first
    const contacts = await Contact.find({ user: req.user }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST  api/contact
// @desc      Add contacts of logged in user
// @access    Private
//adding 'auth' middleware as this is a protected route and also validation for name
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter a name!").not().isEmpty(),
      check("phone", "Please add a phone number!")
        .not()
        .isEmpty()
        .isLength({ min: 10, max: 10 }),
    ],
  ],
  async (req, res) => {
    //collecting all the errors occurred in validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //if there are errors
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //destructuring from body
      const { name, email, phone, type } = req.body;

      //creating a new instance of Contact schema
      const newContact = new Contact({
        user: req.user, //specifying the ID of particular user
        name,
        email,
        phone,
        type,
      });

      //save to database
      const contacts = await newContact.save();
      res.json(contacts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT  api/contact/:id
// @desc      Update contacts of logged in user
// @access    Private
router.put("/:id", auth, async (req, res) => {
  //destructuring from body
  const { name, email, phone, type } = req.body;

  //building an object if any of the field gets updated
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    //check if the requested contact is available or not
    if (!contact) {
      res.status(404).json({ msg: "Contact not Found!" });
    }

    //check if the user owns the contact
    if (contact.user.toString() !== req.user) {
      res.status(401).json({ msg: "Unauthorized!" });
    }

    //if everything goes okay, then update the fields based on the ID else create a new one
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE  api/contact/:id
// @desc      Delete contacts of logged in user
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    //check if the requested contact is available or not
    if (!contact) {
      res.status(404).json({ msg: "Contact not Found!" });
    }

    //check if the user owns the contact
    if (contact.user.toString() !== req.user) {
      res.status(401).json({ msg: "Unauthorized!" });
    }

    //if everything goes okay, then delete contact
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
