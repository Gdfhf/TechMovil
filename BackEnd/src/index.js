const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//configuracion
app.use(cors());
app.set('port',process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded( {extended:false} ) );
app.use(express.json());

//Routes
app.use(require('./routes/index'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/proveedores', require('./routes/proveedores'));

app.listen(app.get('port'),()=>{
    console.log("Server escuchando en el puerto " + app.get('port'))
});