const menuItemModel = require('../models/menuModel');

// Add Menu Item (Admin Only)
const addMenuItem = async (req, res) => {
    try {
        const { name, category, description, price } = req.body;

        const newMenuItem = new menuItemModel({
            name,
            category,
            description,
            price,
        });

        const savedMenuItem = await newMenuItem.save();

        res.status(201).json({
            message: 'Menu item added successfully',
            menuItem: savedMenuItem,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Menu Item (Admin Only)
const deleteMenuItem = async (req, res) => {
    try {
        const { menuItemId } = req.params;

        const menuItem = await menuItemModel.findByIdAndDelete(menuItemId);

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json({
            message: 'Menu item deleted successfully',
            menuItem,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit Menu Item (Admin Only)
const editMenuItem = async (req, res) => {
    try {
        const { menuItemId } = req.params;
        const { name, category, description, price } = req.body;

        const updatedMenuItem = await menuItemModel.findByIdAndUpdate(
            menuItemId,
            { name, category, description, price },
            { new: true, runValidators: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json({
            message: 'Menu item updated successfully',
            menuItem: updatedMenuItem,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
};
