const express = require('express');
const router = express.Router();

const adminCon = require('../controllers/admin');


router.get('/add-product',adminCon.get_addProduct);
router.post('/add-product',adminCon.post_addProdduct);


module.exports = router;
