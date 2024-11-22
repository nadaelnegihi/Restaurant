const feedbackModel = require('../models/feedbackModel');

// Submit Feedback (User Only)
const submitFeedback = async (req, res) => {
    try {
        const { reservation_id, details, rating } = req.body;
        const customer_id = req.user.id;

        const newFeedback = new feedbackModel({
            customer_id,
            reservation_id,
            rating,
            details,
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback: savedFeedback,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View Feedback (Admin Only)
const viewFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find()

        res.status(200).json({
            message: 'Feedback retrieved successfully',
            feedbacks,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    submitFeedback,
    viewFeedback,
};
