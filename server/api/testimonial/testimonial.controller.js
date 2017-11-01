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
