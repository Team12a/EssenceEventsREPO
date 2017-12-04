/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Routes used
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use('/api/users', require('./api/user'));
  app.use('/api/subcontractors', require('./api/subcontractor'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/links', require('./api/link'));
  app.use('/api/email', require('./api/email'));
  app.use('/api/payments', require('./api/payment'));
  app.use('/api/testimonial', require('./api/testimonial'));
  //not sure about this
  app.use('/api/superAdmins', require('./api/superAdmin'));
  app.use('/api/textEdit', require('./api/textEdit'));
  app.use('/api/cloudinary', require('./api/cloudinary'));
  app.use('/cloudinary_cors.html', require('./api/cloudinary/cloudinary_cors.html'));

  app.use('/auth', require('./auth'));

  //Not a clue what the fuck this does!
  

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
