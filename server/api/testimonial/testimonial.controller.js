'use strict';

import Testimonial from './testimonial.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

export function findAll(req, res) {
  Testimonial.find({}, function(err, testimonial) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else
      res.send(testimonial);
  });
}

export function findOneById(req, res) {
  res.send(req.testimonial);
}

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

export function testimonialById(req, res, next, id) {
  Testimonial.findById(id, function(err, testimonial) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    else {
      req.testimonial = testimonial;
      next();
    }
  });
}

//Create a new event based on req.body and save it to the database
export function create(req, res) {
  var testimonial = new Testimonial(req.body);
  testimonial.save(function(err) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else
      res.send('Creation Successful');
  });
}
