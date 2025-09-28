const mongoose = require('mongoose');

// Simple MongoDB connection for development
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmtech-waitlist';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.log('⚠️  MongoDB connection failed, but continuing without database...');
        console.log('   You can still test the frontend, but data won\'t be saved.');
        console.log('   To enable full functionality, start MongoDB or use MongoDB Atlas.');
    }
};

// Start the application
const startApp = async () => {
    await connectDB();
    require('./server.js');
};

startApp();
