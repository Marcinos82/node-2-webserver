const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log +'\n');
  next();
});

// app.use((req, res, next)=>{
//     res.render('maintance');
// });

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Siemanko! Witaj na super stronie. Poczuj się jak u siebie.'

  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
