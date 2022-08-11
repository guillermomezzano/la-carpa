const mongoose = require("mongoose");
//Crear un esquema para usuarios
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const EmpleadorSchema = new mongoose.Schema({
		
	nombre:{
		type: String , //cada nuevo documento se formateara asi  
		required:[true, "nombre obligatorio"],
		minlength:[3, "debe tener un minimo de 3 caracateres"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
			message: "Please enter a valid email"
	 	 }
	  },
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be 8 characters or longer"]
	  },
	fono:{
		type: Number,
		required:[true, "tipo obligatorio"],
	},
},{timestamps: true});



EmpleadorSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

EmpleadorSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
	}
	next();
});

EmpleadorSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});	
//crear una función constructora para nuestro modelo y almacenarla en la variable 'Artista'
EmpleadorSchema.plugin(uniqueValidator);

const empleador = mongoose.model("empleador",  EmpleadorSchema); // se crea variable artista 
											//para exportar la configuracion 
									
module.exports = empleador; // Exportar la variable Artista nos permitirá importar 
						//y usar la función del constructor Usuario en cualquier archivo que elijamos.