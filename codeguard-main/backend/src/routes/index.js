'use strict';

const express = require('express');
const health = require('./health');
const challenges = require('./challenges');
const submissions = require('./submissions');

const router = express.Router();

router.use('/health', health);
router.use('/challenges', challenges);
router.use('/submissions', submissions);

// Phase 3+ will add:
//   router.use('/auth',      require('./auth'));
//   router.use('/dashboard', require('./dashboard'));

module.exports = router;
