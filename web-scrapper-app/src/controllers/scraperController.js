const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Company = require('../models/company');

const scrapeData = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const logo = $('meta[property="og:image"]').attr('content') || $('link[rel="icon"]').attr('href');
  const facebook_url = $('a[href*="facebook.com"]').attr('href');
  const linkedin_url = $('a[href*="linkedin.com"]').attr('href');
  const twitter_url = $('a[href*="twitter.com"]').attr('href');
  const instagram_url = $('a[href*="instagram.com"]').attr('href');
  const address = $('address').text();
  const phone = $('a[href^="tel:"]').text();
  const email = $('a[href^="mailto:"]').text();

  return { name, description, logo, facebook_url, linkedin_url, twitter_url, instagram_url, address, phone, email };
};

const captureScreenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshotPath = `public/screenshots/${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath });
  await browser.close();
  return screenshotPath;
};

const scrapeAndSave = async (req, res) => {
  const { url } = req.body;
  try {
    const data = await scrapeData(url);
    const screenshot_path = await captureScreenshot(url);
    const companyData = { ...data, screenshot_path };
    Company.create(companyData, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllCompanies = (req, res) => {
  Company.findAll((err, companies) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(companies);
  });
};

const deleteCompanies = (req, res) => {
  const { ids } = req.body;
  Company.delete(ids, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
};

module.exports = { scrapeAndSave, getAllCompanies, deleteCompanies };
