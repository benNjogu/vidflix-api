const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

//model and schema
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 13,
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Customer with that ID not found");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    {
      new: true,
    }
  );

  if (!customer) return res.status(404).send("Customer with that ID not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("Customer with that ID not found");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    phone: Joi.string().min(10).max(13).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

module.exports = router;
