require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');
const ProdModel = require('./Products');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB is connected'))
.catch(err => console.log(err));

//==============================================================
app.get('/', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  })
  .then(user => res.json(user))
  .catch(err => res.json(err));
});

app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

app.post('/signup', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username, password })
    .then(user => {
      if (user) {
        res.json({ user, message: 'Login Successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    })
    .catch(err => res.json(err));
});

//==============================================================
app.get('/prod', (req, res) => {
  ProdModel.find()
    .then(product => res.json(product))
    .catch(err => res.json(err));
});

app.get('/getprod/:id', (req, res) => {
  const id = req.params.id;
  ProdModel.findById(id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ message: 'Product not found' }));
});

app.post('/createprod', (req, res) => {
  ProdModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/updateprod/:id', (req, res) => {
  const id = req.params.id;
  ProdModel.findByIdAndUpdate({_id: id}, {
    productname: req.body.productname,
    quantity: req.body.quantity,
    sales: req.body.sales,
  })
  .then(user => res.json(user))
  .catch(err => res.json(err));
});

app.delete('/deleteprod/:id', (req, res) => {
  const id = req.params.id;
  ProdModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// New endpoint for fetching chart data
app.get('/chart-data', async (req, res) => {
  try {
    const salesData = await ProdModel.find({}, { productname: 1, sales: 1, _id: 0 });
    const chartData = salesData.map((data) => ({
      month: data.productname,
      sales: parseFloat(data.sales),
    }));
    res.json(chartData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
