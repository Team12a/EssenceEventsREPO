'use strict';

import Payment from './payment.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';



//Sends back all payments with open find call
export function findAll(req, res) {
  Payment.find({}, function(err, payments) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else
      res.send(payments);
  });
}
//Uses the findByUser to send all user payments back
export function findAllByUser(req, res) {
  res.send(req.payments);
}

//Uses the findOneById middleman to send back payment by ID
export function findOneById(req, res) {
  res.send(req.payment);
}

//Create a new payment based on req.body and save it to the database
export function create(req, res) {
  var payment = new Payment(req.body);
  payment.save(function(err, payment) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      res.send(payment._id);
    }
  });
}

//Update payment by ID
export function update(req, res) {
  Payment.update({_id: req.body._id}, req.body, function(err, payment) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      res.send('Update successful');
    }
  });
}

//Remove a payment by it's Mongoose ID
export function remove(req, res) {
  Payment.remove({_id: req.payment._id}, function(err) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else
      res.send('Deletion successful');
  });
}

//Remove all payments by a certain user, req.payments.length checks if User exists
export function removeUser(req, res) {
  if (req.payments.length > 0)
    Payment.find({userId: req.payments[0].userId})
      .remove(function (err) {
	if (err) {
	  throw err;
	  res.status(400).end();
	}
	else
	  res.send('did it');
    });
  else
    res.status(400).end();
}

//Middleman to find a particular payment by ID
export function paymentById(req, res, next, id) {
  Payment.findById(id, function(err, payment) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      req.payment = payment;
      next();
    }
  });
}

//Middleman to find all payments by a certain UserId
export function paymentsByUserId(req, res, next, userId) {
  Payment.find({userId: userId}, function(err, payments) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      req.payments = payments;
      next();
    }
  });
}
