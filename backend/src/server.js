require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/Task');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();


// Middleware

app.use(
    cors(
        {
          origin:'http://localhost:5173',
          credentials:true,
          methods:['GET','POST','PUT','DELETE'],
          allowedHeaders:['Content-Type', 'Authorization']
        }
    )
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes)
app.use('/api/task', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API' });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

