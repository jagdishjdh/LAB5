const express = require('express');
const router = express.Router();

const cart = require('../controllers/cart')

router.get('/', cart.get_cart);
router.post('/', cart.post_cart);
router.get('/remove/:id', cart.remove_item_from_cart)

module.exports = router;