const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rfcw:EGuNaluLGvTYCDe9@rfc-wetteren.iviztzb.mongodb.net/?retryWrites=true&w=majority&appName=rfc-wetteren', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
