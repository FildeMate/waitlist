# 🌱 FarmTech Waitlist

A dynamic, modern waitlist application for FarmTech - an AI-powered agriculture platform focused on farming, composting, and intelligent agricultural agents.

## Features

- **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **Dynamic Forms**: Smart form validation and user-friendly interface
- **Real-time Stats**: Live waitlist statistics and analytics
- **Farm-Specific Data**: Collects relevant farming information (farm type, size, interests)
- **Rate Limiting**: Built-in protection against spam and abuse
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **RESTful API**: Clean API endpoints for data management

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   git clone <your-repo-url>
   cd farmtech-waitlist
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and other settings
   ```

3. **Start MongoDB**:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
   ```

4. **Run the application**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Visit the application**:
   Open your browser and go to `http://localhost:3000`

## API Endpoints

### POST /api/waitlist
Join the waitlist
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "farmType": "vegetable",
  "farmSize": "medium",
  "interests": "ai-optimization"
}
```

### GET /api/waitlist/stats
Get waitlist statistics
```json
{
  "totalSignups": 150,
  "thisWeek": 25,
  "farmTypeStats": [...],
  "interestStats": [...]
}
```

### GET /api/waitlist/entries
Get all waitlist entries (admin)

### GET /api/health
Health check endpoint

## Data Model

The waitlist collects the following information:

- **Email**: Unique identifier
- **Name**: Full name
- **Farm Type**: vegetable, fruit, grain, livestock, greenhouse, urban, other
- **Farm Size**: small (1-10 acres), medium (10-100 acres), large (100+ acres), urban/backyard
- **Interests**: AI optimization, composting, soil health, pest management, water management, yield prediction, sustainability
- **Signup Date**: Automatic timestamp
- **Status**: active, notified, converted

## Customization

### Styling
Edit the CSS in `index.html` to match your brand colors and design preferences.

### Form Fields
Modify the form fields in `index.html` and update the corresponding schema in `server.js`.

### Database
The application uses MongoDB. You can easily switch to other databases by modifying the connection and schema in `server.js`.

## Deployment

### Heroku
1. Create a Heroku app
2. Add MongoDB Atlas addon
3. Set environment variables
4. Deploy

### Vercel/Netlify
1. Build the application
2. Deploy the static files
3. Deploy the backend separately (or use serverless functions)

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@farmtech.com or create an issue in the repository.

---

**FarmTech** - Revolutionizing agriculture with AI-powered solutions 🌱
