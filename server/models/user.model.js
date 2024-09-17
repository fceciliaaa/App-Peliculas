const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor proporciona el nombre.'],
        minLength: [3, 'Por favor proporciona un nombre real.']
    },
    lastName: {
        type: String,
        required: [true, 'Por favor proporciona el apellido.'],
        minLength: [3, 'Por favor proporciona un apellido real.']
    },
    email: {
        type: String,
        required: [true, 'Por favor proporciona el correo.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor proporciona el password.']
    },
    // createdEvents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'events'
    // } 
    // ],
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }], //campo para la guardar los datos de mis de mis favoritos
},
{timestamps: true});

const UserRegistration = mongoose.model('userRegister', userSchema);

module.exports = UserRegistration;