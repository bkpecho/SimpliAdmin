const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// get homepage
exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash('info');
  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJS User Management System'
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Customer.count();

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
    });
  } catch (error) {
    console.log(error);
  }
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

exports.viewCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: 'View Customer Data',
      description: 'Free NodeJS User Management System'
    };

    res.render('customer/view', { locals, customer });
  } catch (error) {
    console.log(`🔴🔴🔴 Customer Data Loading Failed: ${error}`);
  }
};
