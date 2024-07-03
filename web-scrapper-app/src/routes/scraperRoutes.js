const express = require('express');
const router = express.Router();
const { scrapeAndSave, getAllCompanies, deleteCompanies } = require('../controllers/scraperController');

router.post('/scrape', scrapeAndSave);
router.get('/companies', getAllCompanies);
router.delete('/companies', deleteCompanies);

module.exports = router;
