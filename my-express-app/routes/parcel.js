// const express = require('express');
// const router = express.Router();
// const { getAllParcels, assignToAgent,updateStatus,getStats } = require('../controllers/parcelController');

// router.get('/', getAllParcels);

// router.put('/:parcelId/assign', assignToAgent);

// router.put('/:id/status', updateStatus);

// router.get('/stats', getStats);

// module.exports = router;


// src/routes/parcels.js

const express = require('express');
const router = express.Router();
const { auth, authenticate } = require('../middlewares/authMiddleware');
const {createParcel,getUserParcels,updateParcelStatus,trackParcel,cancelparcel, getAllParcels,assignParcelToAgent} = require('../controllers/parcelController');

router.post('/',authenticate, createParcel);
router.post("/assign",authenticate, assignParcelToAgent);

router.get('/',authenticate, getAllParcels);
router.get('/user',authenticate,getUserParcels);
router.put('/:id/cancel',authenticate,cancelparcel);
router.put('/:id/status', authenticate, updateParcelStatus);
router.get('/track/:trackingNumber',trackParcel);


// Export the router
module.exports = router;