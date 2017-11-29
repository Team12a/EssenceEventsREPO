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

export function update(req, res){
  TextEdit.update({text_id: req.body.text_id}, req.body, function(err, literalText){
    if(err){
      res.status(400).send('There is nothing here!');
      throw err;
    }
    else{
      res.send('Successful update');
    }
  });
}

//Uses the findOneById middleman to send back payment by ID
export function findOneById(req, res) {
  res.send(req.literalText);
}

export function textByID(req, res, next, text_id) {
  TextEdit.find({text_id: text_id}, function(err, literalText) {
    if (err) {
      console.log('wwhheoaef');
      res.status(400).send(err);
      throw err;
    }
    else {
      req.literalText = literalText;
      next();
    }
  });
}

// export function update(req, res) {
//   var text = new TextEdit(req.body);

//   TextEdit.text_id = req.body.text_id;
//   TextEdit.literalText = req.body.literalText;

//   if(req.results)
//   {
//     TextEdit.coordinates =
//     {
//       latitude: req.results.lat,
//       longitude: req.results.lng
//     };
//   }

//   listing.save(function(err)
//   {
//     if(err)
//     {
//       console.log(err);
//       res.status(400).send(err);
//     }
//     else
//     {
//       res.json(listing);
//     }
//   });
// };
