import './loginComponent.css';
import loginIcon from './img/sign-in.png'
import { useRef } from 'react';

const doLogin = (ev,input_user, input_password) => {
    const user = input_user.current.value;
    const password = input_password.current.value;

    if(user && password) {
        console.log(`USER: ${user} - PASSWORD: ${password}`)
        ev.preventDefault();
    }

}

export const LoginComponent = () => {

    const input_user = useRef();
    const input_password = useRef();

    return <>
        <>
            <div className="container container-form-principal ">
                <form action="">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="input_user">USUARIO</label>
                        </div>
                        <div className="col-6">
                            <input name='input_user' type="text" required ref={input_user}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="input_password">CONTRASEÑA</label>
                        </div>
                        <div className="col-6">
                            <input name='input_password' type="password" required ref={input_password}/>
                        </div>
                        <div className="button mt-5">
                            <button className="mx-auto d-block btn-login" title='Iniciar sesión'
                                onClick={ev => doLogin(ev,input_user, input_password)}>
                                <img src={loginIcon} alt="Login icon"/>
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        </>
    </>
}