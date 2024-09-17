const UserRegistration = require('../models/user.model');
const jwt = require('jsonwebtoken');
const clave = "esto_es_secreto";

//crear un usuario
module.exports.createUser = (req, res) => {
    UserRegistration.create(req.body)
        .then((newUser) => {
            const infoEnToken = {
                _id: newUser._id,
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email
            }

            jwt.sign(infoEnToken, clave, {expiresIn: '45m'}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error al generar el token'});
                }
                return res.status(200).json({token, user: {
                    id: newUser._id,
                    name: newUser.name,
                    lastName: newUser.lastName,
                    email: newUser.email,
                }});
            });
        })
        .catch((error) => {
            console.log(error.message);
            res.statusMessage = error.message;
            return res.status(400).json(error.message);
        });
};

//Obtener todos los usuarios
module.exports.getAllUsers = (req, res) => {
    UserRegistration.find()
        .then((userList) => {
            return res.status(200).json(userList);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

//Para hacer login
module.exports.login = (req, res) => {
    const {email, password} = req.body;
    
    UserRegistration.findOne({email, password})
        .then((userFound) => {
            if(! userFound){
                res.statusMessage = 'Credenciales incorrectas.';
                return res.status(404).json({message: 'Credenciales incorrectas.'});
            }
            
            const infoInToken = {
                _id: userFound._id,
                name: userFound.name,
                lastName: userFound.lastName,
                email: userFound.email
            }

            jwt.sign(infoInToken, clave, {expiresIn: '45m'}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error al generar el token'});
                }
                return res.status(200).json({token, userFound});
            });
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
}

// Logica para agregar a favoritos
// module.exports.addToFavorites = (req, res) => {
//     const { eventId } = req.body;
    
//     // Validate eventId
//     if (!eventId) {
//         return res.status(400).json({ message: "Event ID is required." });
//     }
//     UserRegistration.findById(req.infoUser._id) // Usar el ID del usuario desde el token
//     .then(user => {
//         if (!user) {
//         return res.status(404).json({ message: "Usuario no encontrado." });
//         }

//         if (user.favorites.includes(eventId)) {
//         return res.status(400).json({ message: "El evento ya está en la lista de favoritos." });
//         }

//         user.favorites.push(eventId);
//         return user.save();
//     })
//     .then(() => {
//         res.status(200).json({ message: "Evento agregado a favoritos." });
//     })
//     .catch((error) => {
//         res.status(400).json({ message: "Error al agregar a favoritos", error });
//     });
// };

//   // logica para obtener favoritos
// module.exports.getFavorites = (req, res) => {
//     UserRegistration.findById(req.infoUser._id)
//       .populate('favorites') // Para obtener los detalles de los eventos
//         .then(user => {
//             if (!user) return res.status(404).json({ message: "Usuario no encontrado." });
//             res.status(200).json(user.favorites);
//         })
//         .catch((error) => {
//             return res.status(400).json({ message: "Error al obtener favoritos", error });
//         });
// };


// // Lógica para eliminar de favoritos
// module.exports.removeFromFavorites = (req, res) => {
//     const { eventId } = req.params; // El ID del evento que se eliminará de favoritos

//     UserRegistration.findById(req.infoUser._id) // Usar el ID del usuario desde el token
//     .then(user => {
//         if (!user) {
//             return res.status(404).json({ message: "Usuario no encontrado." });
//         }

//         const index = user.favorites.indexOf(eventId);
//         if (index === -1) {
//             return res.status(400).json({ message: "El evento no está en la lista de favoritos." });
//         }

//         user.favorites.splice(index, 1); // Eliminar el evento de la lista de favoritos
//         return user.save();
//     })
//     .then(() => {
//         res.status(200).json({ message: "Evento eliminado de favoritos." });
//     })
//     .catch((error) => {
//         res.status(400).json({ message: "Error al eliminar de favoritos", error });
//     });
// };




