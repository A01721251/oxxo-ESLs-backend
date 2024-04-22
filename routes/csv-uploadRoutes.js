// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// const { parseCSVAndUpdateDatabase } = require('../controllers/csvController');

// router.post('/upload', upload.single('file'), (req, res) => {
//     const filePath = req.file.path;
//     parseCSVAndUpdateDatabase(filePath)
//         .then(() => res.status(200).json({ message: 'File processed successfully' }))
//         .catch(error => res.status(500).json({ message: 'Error processing file', error: error.message }));
// });

// module.exports = router;