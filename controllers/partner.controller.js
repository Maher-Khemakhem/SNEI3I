const Partner = require('../models/partner.model');

const getpartner = async (req, res) => {
  try {
    const partners = await Partner.find({});

    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving top-rated workers: ${error.message}` });
  }
};

module.exports = { getpartner };
