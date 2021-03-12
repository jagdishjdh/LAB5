const express = require('express');
const router = express.Router();

const orders = require("../controllers/orders")

router.get('/', orders.get_orders);
router.post('/', orders.buy);

module.exports = router;