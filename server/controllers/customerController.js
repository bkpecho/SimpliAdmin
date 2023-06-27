const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// get homepage
exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash('info');

  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJS User Management System'
  };

  res.render('index', { locals, messages });
};

// get - new customer form
exports.addCustomer = async (req, res) => {
  const locals = {
    title: 'Add New Customer - NodeJS',
    description: 'Free NodeJS User Management System'
  };

  res.render('customer/add', locals);
};

// post - create new customer
exports.postCustomer = async (req, res) => {
  // generate customer object
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details
  });

  const locals = {
    title: 'New Customer Added!',
    description: 'Free NodeJS User Management System'
  };

  try {
    // access the model declared above and pass in the generated object / user data from the form
    await Customer.create(newCustomer);

    await req.flash('info', 'New customer has been added.');

    //redirect back to dashboard after adding new Customer
    res.redirect('/');
  } catch (error) {
    console.log(`🔴🔴🔴 New Customer Creation Failed: ${error}`);
  }
};
