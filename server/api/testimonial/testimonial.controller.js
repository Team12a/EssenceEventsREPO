'use strict';

import Testimonial from './testimonial.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

//Sends back all events with open find call
export function findAll(req, res) {
  Testimonial.find({}, function(err, testimonial) {
    if (err)
      res.status(400).send(err);
    else
      res.send(testimonial);
  });
}

//Uses the findByUser to send all user events back
export function findAllByUser(req, res) {
  res.send(req.testimonial);
}

//Uses the findOneById middleman to send back event by ID
export function findOneById(req, res) {
  res.send(req.testimonial);
}

//Create a new event based on req.body and save it to the database
export function create(req, res) {
  var testimonial = new Testimonial(req.body);
  testimonial.save(function(err, testimonial) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      res.send(testimonial._id);
    }
  });
}

//Find event by ID and then change toDoList array, used for client side interaction
export function toggleTodo(req, res) {
  Testimonial.findOne({_id: req.testimonial._id}, function(err, testimonial) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else {
      testimonial.toDoList[req.body.index].done = req.body.bool;
      testimonial.save(function(err) {
        if (err) {
	  throw err;
	  res.status(400).send(err);
	}
	else
	  res.send('Todo change successful');
      });
    }
  });
}

//Update event by ID
export function update(req, res) {
  Testimonial.update({_id: req.body._id}, req.body, function(err, testimonial) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      res.send('Update successful');
    }
  });
}


//Remove an event by it's Mongoose ID
export function remove(req, res) {
  Testimonial.remove({_id: req.testimonial._id}, function(err) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else
      res.send('Deletion successful');
  });
}

//Remove all events by a certain user, req.events.length checks if User exists
export function removeUser(req, res) {
  if (req.testimonial.length > 0)
    Testimonial.find({userId: req.testimonial[0].userId})
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
