
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; 


const menuItemSchema = new mongoose.Schema({
    dish: String,
    price: Number,
    description: String,
  }, { collection: 'menuItems' }); 
  


const MenuItem = mongoose.model('MenuItem', menuItemSchema);

mongoose.connect('mongodb://127.0.0.1:27017/restaurantDB')
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));



app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetching all menu items
        res.json(menuItems);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
