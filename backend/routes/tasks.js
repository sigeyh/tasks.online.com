const express = require('express');
const router = express.Router();

const mockTasks = [
  { id: 1, type: 'Data Annotation', title: 'Label Bounding Boxes', earnings: 15, estimatedTime: '5 min', status: 'Available' },
  { id: 2, type: 'Writing', title: 'Write a 300 word summary', earnings: 50, estimatedTime: '15 min', status: 'Available' },
  { id: 3, type: 'Image Judging', title: 'Rate 10 images for safety', earnings: 20, estimatedTime: '10 min', status: 'Available' },
  { id: 4, type: 'AI Feedback', title: 'Rank Chatbot Responses', earnings: 35, estimatedTime: '12 min', status: 'Available' },
  { id: 5, type: 'Audio Tagging', title: 'Classify 5 Audio Snippets', earnings: 25, estimatedTime: '8 min', status: 'Available' },
  { id: 6, type: 'Writing', title: 'SEO Blog Post on AI', earnings: 100, estimatedTime: '30 min', status: 'Available' },
  { id: 7, type: 'Transcription', title: 'Transcribe 2 minute audio call', earnings: 40, estimatedTime: '15 min', status: 'Available' },
];

router.get('/', (req, res) => {
  res.json(mockTasks);
});

router.post('/:id/claim', (req, res) => {
  res.json({ success: true, message: 'Task claimed successfully' });
});

module.exports = router;
