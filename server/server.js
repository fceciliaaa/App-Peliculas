const express = require('express');
const app = express();
const cors = require('cors');

const moviesRoutes = require('./routes/pelicula.routes');
const commentsRoutes = require('./routes/comentarios.routes')
const userRoutes = require('./routes/user.routes');

require('./config/mongoose.config') 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/pelicula', moviesRoutes);
app.use('/comentarios', commentsRoutes);
app.use('/user', userRoutes);

app.listen(8080, () => {
  console.log('El servidor ya está encendido en el puerto 8080.');
}); 