// routes/apiRoutes.js
const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

// Users Routes
router.get('/users', apiController.getUsers);
router.post('/users', apiController.createUser);
router.put('/users/:id', apiController.updateUser);
router.delete('/users/:id', apiController.deleteUser);


// Products Routes
router.get('/products', apiController.getProducts);
router.get('/getlowstock', apiController.getProductsWithLowStock);
router.post('/products', apiController.createProduct);
router.put('/products/:product_id', apiController.updateProduct);
router.delete('/products/:product_id', apiController.deleteProduct);


router.get('/suppliers', apiController.getSuppliers);
router.post('/suppliers', apiController.createSupplier);
router.put('/suppliers/:supplier_id', apiController.updateSupplier);
router.delete('/suppliers/:supplier_id', apiController.deleteSupplier);

// Transactions Routes
router.get('/transactions', apiController.getTransactions);
router.post('/transactions', apiController.createTransaction);

// Orders Routes
router.get('/orders', apiController.getOrders);
router.post('/orders', apiController.createOrder);

// Notifications Routes
router.get('/notifications', apiController.getNotifications);
router.post('/notifications', apiController.createNotification);

module.exports = router;
