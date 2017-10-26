'use strict';

import Testimonial from './testimonial.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';


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
