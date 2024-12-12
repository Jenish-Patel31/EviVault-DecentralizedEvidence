const express= require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const cors = require('cors');
const registerRoutes = require('./routes/routes');
const PORT = 3000;
const app = express();



app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static('public'));


//connect to mongoose

mongoose.connect('mongodb+srv://jenishkp07:jenishkp07@cluster0.4neyt.mongodb.net/evivault?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB connection error :",err));



//routes
app.use('/auth', registerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});