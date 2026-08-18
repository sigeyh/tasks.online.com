const express = require('express');
const router = express.Router();

router.post('/stk-push', (req, res) => {
  const { phone, amount, plan } = req.body;
  
  // Simulate M-Pesa STK Push
  console.log(`Initiating STK Push to ${phone} for ${amount} KES (${plan})`);
  
  // In a real app we'd initiate the STK push here and wait for callback webhook.
  // We mock a successful initiation immediately.
  res.json({
    success: true,
    message: 'STK Push initiated successfully',
    merchantRequestID: 'Req_' + Math.random().toString(36).substring(7)
  });
});

module.exports = router;
