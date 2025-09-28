const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/waitlist', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farmtech-waitlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Waitlist Schema
const waitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    farmType: {
        type: String,
        required: true,
        enum: ['vegetable', 'fruit', 'grain', 'livestock', 'greenhouse', 'urban', 'other']
    },
    farmSize: {
        type: String,
        required: true,
        enum: ['small', 'medium', 'large', 'urban']
    },
    interests: {
        type: String,
        required: true,
        enum: ['ai-optimization', 'composting', 'soil-health', 'pest-management', 'water-management', 'yield-prediction', 'sustainability']
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'notified', 'converted'],
        default: 'active'
    }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Join waitlist
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email, name, farmType, farmSize, interests } = req.body;
        
        // Validate required fields
        if (!email || !name || !farmType || !farmSize || !interests) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if email already exists
        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        // Create new waitlist entry
        const newEntry = new Waitlist({
            email,
            name,
            farmType,
            farmSize,
            interests
        });
        
        await newEntry.save();
        
        res.status(201).json({ 
            message: 'Successfully joined waitlist!',
            position: await Waitlist.countDocuments()
        });
        
    } catch (error) {
        console.error('Error joining waitlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get waitlist statistics
app.get('/api/waitlist/stats', async (req, res) => {
    try {
        const totalSignups = await Waitlist.countDocuments();
        
        // Calculate this week's signups
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = await Waitlist.countDocuments({
            signupDate: { $gte: oneWeekAgo }
        });
        
        // Get farm type distribution
        const farmTypeStats = await Waitlist.aggregate([
            { $group: { _id: '$farmType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        // Get interest distribution
        const interestStats = await Waitlist.aggregate([
            { $group: { _id: '$interests', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        res.json({
            totalSignups,
            thisWeek,
            farmTypeStats,
            interestStats
        });
        
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all waitlist entries (admin endpoint)
app.get('/api/waitlist/entries', async (req, res) => {
    try {
        const entries = await Waitlist.find().sort({ signupDate: -1 });
        res.json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌱 FarmTech Waitlist Server running on port ${PORT}`);
    console.log(`📊 Visit http://localhost:${PORT} to view the waitlist`);
});

module.exports = app;
