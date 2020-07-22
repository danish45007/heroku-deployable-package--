require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// allow cross-origin-request
app.use(cors());

// mongoDb connection
// DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("DB CONNECTED");
})

// middleware
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );

// Definig port  
const PORT = process.env.PORT || 4001 
// app is listen 

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'))
// }

app.listen(PORT,() => {
  console.log(`App is running on port ${PORT}`)
});

