const subscriber = require('./subscriber');
const generator = require('./generator');

if (process.env.MODE === 'subscriber') {
  subscriber();
}

if (process.env.MODE === 'generator')  {
  generator();
}


