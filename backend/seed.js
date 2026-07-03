const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Models import karo
const User = require('./models/userModel');
const Visitor = require('./models/visitorModel');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');

        await User.deleteMany({});
        await Visitor.deleteMany({});
        console.log('Old data cleared');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.create([
            { name: 'Admin User', email: 'admin@vpms.com', password: hashedPassword, role: 'admin' },
            { name: 'Security Guard', email: 'security@vpms.com', password: hashedPassword, role: 'security' },
            { name: 'John Employee', email: 'employee@vpms.com', password: hashedPassword, role: 'employee' },
        ]);
        console.log('Users created');

        await Visitor.create([
            { name: 'Rahul Shah', email: 'rahul@gmail.com', phone: '9876543210', purpose: 'Meeting', status: 'pending' },
            { name: 'Priya Patel', email: 'priya@gmail.com', phone: '9876543211', purpose: 'Interview', status: 'approved' },
            { name: 'Amit Kumar', email: 'amit@gmail.com', phone: '9876543212', purpose: 'Delivery', status: 'pending' },
        ]);
        console.log('Visitors created');

        console.log(' Seed Complete!');
        process.exit(0);

    } catch(error) {
        console.log(' Seed Failed:', error.message);
        process.exit(1);
    }
}

seedData();