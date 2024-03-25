import { useEffect } from 'react';
import {useForm, useAuthStore} from '../../hooks'
import './LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields ={
    loginEmail: '',
    loginPassword:'',
}

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',

}

export const LoginPage = () => {

    const {startLogin, errorMessage, startRegister} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange, } = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange } = useForm(registerFormFields);

    const loginSubmit  = (event) =>{
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
        
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(()=>{
        if(errorMessage !==undefined){
            Swal.fire('Error en la auntenticación', errorMessage,'error');
        }
    },[errorMessage])



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                        
                    <form onSubmit=""> 
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value=""
                                onChange=""
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value=""
                                onChange=""
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value=""
                                onChange=""
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value=""
                                onChange=""
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value=""
                                onChange=""
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value=""
                                onChange=""
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}