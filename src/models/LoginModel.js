 const mongoose = require('mongoose');
const validator = require('validator');

 const LoginSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
    }
 );

const LoginModel = mongoose.model('Login', LoginSchema);    

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida()
        if(this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch (error) {
            console.log(error);
        }

    }

    valida() {
        this.cleanUp();

        //Validação do email
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Email Inválido.');
            console.log(this.errors);
        }
    
        //Validação da senha 
        if(this.body.password.length < 5 || this.body.password.length > 20) this.errors.push('Senha precisa ter entre 5 e 20 caracteres.');
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] != "string" ) {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }


}

module.exports = Login;
