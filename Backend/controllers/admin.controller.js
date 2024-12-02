const Admin = require('../models/admin.model'); // Adjust the path as needed
const User = require('../models/user.model');
// Create a new Admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    const a = {
        "email" : req.body.email,
        "password":req.body.password,
        "role":"admin",
        "id_role":admin._id,
    }
    const user = new User(a);
    await user.save();
    res.status(201).json({ success: true, message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an Admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete an Admin
exports.deleteAdmin = async (req, res) => {
    try {
      // Find the admin by ID and delete it
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
  
      // Find the associated user by using the id_role (admin._id)
      const user = await User.findOneAndDelete({ id_role: admin._id });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Associated user not found' });
      }
  
      // Return success message once both admin and user are deleted
      res.status(200).json({ success: true, message: 'Admin and associated user deleted successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ success: false, message: error.message });
    }
  };
