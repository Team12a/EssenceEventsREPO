'use strict';

import TextEdit from './textEdit.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

export function findAll(req, res) {
  TextEdit.find({}, function(err, text) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else
      res.send(text);
  });
}

//Create a new event based on req.body and save it to the database
export function create(req, res) {
  var text = new TextEdit(req.body);
  text.save(function(err) {
    if (err) {
      throw err;
      res.status(400).send(err);
    }
    else
      res.send('Creation Successful');
  });
}
