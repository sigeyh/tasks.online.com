const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone:       { type: String, required: true, unique: true, trim: true },
  fullName:    { type: String, required: true, trim: true },
  idNumber:    { type: String, required: true, unique: true, trim: true },
  county:      { type: String, required: true },
  country:     { type: String, required: true },
  gender:      { type: String, required: true },
  tier:        { type: String, default: 'Free' },
  dailyLimit:  { type: Number, default: 5 },
  completedToday: { type: Number, default: 0 },
  balance:     { type: Number, default: 0 },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
