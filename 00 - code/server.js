require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

// Import database
const { initDatabase } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add-book.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-book.html'));
});

app.get('/book-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'book-detail.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'خطای سرور رخ داده است',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Create necessary directories
const createDirectories = () => {
    const dirs = [
        './database',
        './public/uploads/books',
        './public/uploads/warranty'
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 دایرکتوری ایجاد شد: ${dir}`);
        }
    });
};

// Initialize server
const startServer = async () => {
    try {
        // Create directories
        createDirectories();
        
        // Initialize database
        await initDatabase();
        console.log('✅ دیتابیس آماده شد');
        
        // Start server
        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 سرور با موفقیت راه‌اندازی شد!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📍 آدرس: http://localhost:${PORT}`);
            console.log(`📡 API: http://localhost:${PORT}/api`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('');
            console.log('برای توقف سرور: Ctrl + C');
            console.log('');
        });
    } catch (error) {
        console.error('❌ خطا در راه‌اندازی سرور:', error);
        process.exit(1);
    }
};

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 سرور متوقف شد');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 سرور متوقف شد');
    process.exit(0);
});

// Start the server
startServer();
