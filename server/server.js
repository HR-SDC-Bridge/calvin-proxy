const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');


const app = express();
const port = 4000;
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/api/product/:id', (req, res) => {
  // res.redirect(`http://localhost:3003/api/product/${req.params.id}`);
  res.redirect(`http://3.101.86.245:3003/api/product/${req.params.id}`);
  // switch to axios get request to load balancer IP when deployed. Do not use redirects
});

app.post('/api/product/', async (req, res) => {
  res.redirect(307, 'http://3.101.86.245:3003/api/product/');
  // await axios.post('http://3.101.86.245:3003/api/product/')
  //   .then(() => {
  //     res.status(201).send('New product added to the database via proxy')
  //   })
  //   .catch(err => {
  //     console.log('Error with proxy post route to service', err)
  //     res.status(404).end();
  //   })
});

app.get('/images/org/:id', (req, res) => {
  res.redirect(`http://localhost:3004/images/org/${req.params.id}`);

});

app.get('/api/sizes/:id', (req, res) => {
  res.redirect(`http://ec2-18-221-34-3.us-east-2.compute.amazonaws.com:3002/api/sizes/${req.params.id}`);

});

app.get('/api/reviews/:id/details', (req, res) => {
  res.redirect(`http://ec2-100-25-191-161.compute-1.amazonaws.com/${req.params.id}`);

});

app.get('/similar-products-by-views/:id', (req, res) => {
  axios.get(`http://18.222.25.224:3005/similar-products-by-views/${req.params.id}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => console.error('GET OTHERS ALSO VIEWED FAILED: ', err))
});

const server = app.listen(port, function () {
  console.log(`listenting on port:${port}`);
});

module.exports = server;