const mongoose = require("mongoose");
//Crear un esquema para usuarios
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const DisciplinasShema = new mongoose.Schema({
		
	nombreDisciplina:{
		type: String , //cada nuevo documento se formateara asi con un name y age
		required:[true, "nombre obligatorio"],
		minlength:[3, "debe tener un minimo de 3 caracateres"],
	},

	nivel:{
		type: String,
		required:[true, "tipo obligatorio"],
	},
})

const ComentariosShema = new mongoose.Schema({

	nombreAutorComentario:{
		type: String , //cada nuevo documento se formateara asi con un name y age	
	},
		
	texto:{
		type: String , //cada nuevo documento se formateara asi con un name y age	
	},

	calificacion:{
		type: String,	
	},
})



const ArtistaSchema = new mongoose.Schema({
		
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

	region:{
		type: String , //cada nuevo documento se formateara asi con un name y age
		required:[true, "region obligatoria"],
	},
	comuna:{
		type: String,
		required:[true, "tipo obligatorio"],
	},
	fono:{
		type: Number,
		required:[true, "tipo obligatorio"],
	},
	rs:{
		type: String,
		required:[true, "tipo obligatorio"],
	},
	descripcion:{
		type: String,
		required:[true, "descripcion obligatorio"],
		minlength:[3, "debe tener un minimo de 3 caracteres"],	
	},
	disciplinas: [DisciplinasShema],
	comentarios:[ComentariosShema],

},{timestamps: true});



ArtistaSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

ArtistaSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
	}
	next();
});

ArtistaSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});	
//crear una función constructora para nuestro modelo y almacenarla en la variable 'Artista'
ArtistaSchema.plugin(uniqueValidator);

const artista = mongoose.model("artistas",  ArtistaSchema); // se crea variable artista 
											//para exportar la configuracion 
									
module.exports = artista; // Exportar la variable Artista nos permitirá importar 
						//y usar la función del constructor Usuario en cualquier archivo que elijamos.