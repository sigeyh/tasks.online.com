const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/payments', require('./routes/payments'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Center API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
