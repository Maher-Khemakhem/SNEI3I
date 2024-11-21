const Partner = require("../models/partner.model");

const getpartner = async (req, res) => {
  try {
    const partners = await Partner.find({});

    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving top-rated workers: ${error.message}`,
    });
  }
};

const addpartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    const savedPartner = await newPartner.save(); // Corrected the typo here
    res.status(201).json(savedPartner); // Return the savedPartner with a 201 Created status code
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getpartner, addpartner };
