'use strict'

//general structure for handling routing requests and securing routes
import {Router} from 'express';
import * as controller from './superAdmin.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('superAdmin'));

export default router;
