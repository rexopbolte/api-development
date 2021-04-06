const express = require('express');
const env = require('dotenv')
const app = express();
const mongoose = require('mongoose')
const path = require('path');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//Environment
env.config();

//MongoDB Connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.bjeng.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log(`Database Connected to ${process.env.MONGO_DB_DATABASE}`)
});
//mongodb+srv://addler:<password>@cluster0.bjeng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});