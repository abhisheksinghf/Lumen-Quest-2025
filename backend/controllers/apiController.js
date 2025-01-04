// controllers/apiController.js
const db = require('../config/db');

// Users - Get all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Users - Create a new user
const createUser = async (req, res) => {
  const { username, password, role, email } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)',
      [username, password, role, email]
    );
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Products - Get all products
const getProducts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};
// Update Product by product_id
const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { name, category, stock_level, reorder_point, description } = req.body;

  try {
    // Check if the product exists in the database
    const [rows] = await db.execute('SELECT * FROM products WHERE product_id = ?', [product_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If description is not provided, set it to null
    const productDescription = description || null;

    // Update product in the database
    await db.execute(
      `UPDATE products SET name = ?, category = ?, stock_level = ?, reorder_point = ?, description = ? WHERE product_id = ?`,
      [name, category, stock_level, reorder_point, productDescription, product_id]
    );

    // Fetch the updated product from the database
    const [updatedProduct] = await db.execute(
      'SELECT * FROM products WHERE product_id = ?',
      [product_id]
    );

    // Return the updated product data
    res.status(200).json(updatedProduct[0]);  // Sending back the updated product
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};


  // Delete Product by product_id
const deleteProduct = async (req, res) => {
    const { product_id } = req.params;
  
    try {
      // Check if the product exists in the database
      const [rows] = await db.execute('SELECT * FROM products WHERE product_id = ?', [product_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Proceed to delete the product
      await db.execute('DELETE FROM products WHERE product_id = ?', [product_id]);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
  };
  
  const createProduct = async (req, res) => {
    const { name, category, stock_level, reorder_point, description } = req.body;
  
    // Log individual fields for debugging
    console.log('name:', name);
    console.log('category:', category);
    console.log('stock_level:', stock_level);
    console.log('reorder_point:', reorder_point);
    console.log('description:', description);
  
    // Check for required fields
    if (!name || !category || !stock_level || !reorder_point) {
      return res.status(400).json({ message: "All required fields (name, category, stock_level, reorder_point) must be provided." });
    }
  
    // If description is not provided, set it to null
    const productDescription = description || null;
  
    try {
      // Insert product into the database
      const [result] = await db.execute(
        'INSERT INTO products (name, category, stock_level, reorder_point, description) VALUES (?, ?, ?, ?, ?)',
        [name, category, stock_level, reorder_point, productDescription]
      );
      
      // Fetch the newly inserted product to return complete data
      const [newProduct] = await db.execute(
        'SELECT * FROM products WHERE product_id = ?',
        [result.insertId]
      );

      // Return the complete product data
      res.status(201).json(newProduct[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

  
  

// Suppliers - Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM suppliers');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
  }
};

// Suppliers - Create a new supplier
const createSupplier = async (req, res) => {
  const { name, contact_person, phone, email, address } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO suppliers (name, contact_person, phone, email, address) VALUES (?, ?, ?, ?, ?)',
      [name, contact_person, phone, email, address]
    );
    res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating supplier', error: err.message });
  }
};

// Update supplier by supplier_id
const updateSupplier = async (req, res) => {
  const { supplier_id } = req.params;
  const { name, contact_person, phone, email, address } = req.body;

  try {
    // Check if the supplier exists in the database
    const [rows] = await db.execute('SELECT * FROM suppliers WHERE supplier_id = ?', [supplier_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update supplier in the database
    await db.execute(
      `UPDATE suppliers SET name = ?, contact_person = ?, phone = ?, email = ?, address = ? WHERE supplier_id = ?`,
      [name, contact_person, phone, email, address, supplier_id]
    );

    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating supplier', error: err.message });
  }
};

// Delete supplier by supplier_id
const deleteSupplier = async (req, res) => {
  const { supplier_id } = req.params;

  try {
    // Check if the supplier exists in the database
    const [rows] = await db.execute('SELECT * FROM suppliers WHERE supplier_id = ?', [supplier_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Proceed to delete the supplier
    await db.execute('DELETE FROM suppliers WHERE supplier_id = ?', [supplier_id]);

    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting supplier', error: err.message });
  }
};

// Transactions - Get all transactions
const getTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM transactions');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};

// Transactions - Record stock in/out
const createTransaction = async (req, res) => {
  const { product_id, user_id, transaction_type, quantity, remarks } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO transactions (product_id, user_id, transaction_type, quantity, remarks) VALUES (?, ?, ?, ?, ?)',
      [product_id, user_id, transaction_type, quantity, remarks]
    );
    res.status(201).json({ message: 'Transaction recorded successfully', transactionId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error recording transaction', error: err.message });
  }
};

// Orders - Get all orders
const getOrders = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM orders');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// Orders - Create a new order
const createOrder = async (req, res) => {
  const { supplier_id, product_id, quantity, order_date, delivery_date, status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO orders (supplier_id, product_id, quantity, order_date, delivery_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [supplier_id, product_id, quantity, order_date, delivery_date, status]
    );
    res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
};

// Notifications - Get all notifications
const getNotifications = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM notifications');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// Notifications - Create a new notification
const createNotification = async (req, res) => {
  const { notification_type, message } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO notifications (notification_type, message) VALUES (?, ?)',
      [notification_type, message]
    );
    res.status(201).json({ message: 'Notification created successfully', notificationId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating notification', error: err.message });
  }
};

module.exports = {
  getUsers, createUser,
  getProducts, createProduct, updateProduct, deleteProduct,
  getSuppliers, createSupplier, updateSupplier, deleteSupplier,
  getTransactions, createTransaction,
  getOrders, createOrder,
  getNotifications, createNotification
};
