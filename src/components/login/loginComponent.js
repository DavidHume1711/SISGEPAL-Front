import './loginComponent.css';
import loginIcon from './img/sign-in.png'
import { useRef } from 'react';
import { doLoginRequest } from '../../api/request';
import { saveToken, decodeToken } from '../../utils';
import { connect } from 'react-redux';
import { updateSession } from '../../react_redux/slices/sessionSlide';

const doLogin = async (ev,input_user, input_password, updateSession) => {
    const username = input_user.current.value;
    const password = input_password.current.value;

    if(username && password) {
        ev.preventDefault();
        doLoginRequest({username, password})
        .then(({token,error}) => {
            if(error) {
                alert(error);
                return;
            }
            saveToken(token);
            const user = decodeToken();
            console.log('DOCODE TOKEN',user)
            updateSession({isSession: true,user});
        })
    }

}

const mapDispatchToProps = (dispatcher) => {
    return {
        updateSession: (payload) => dispatcher(updateSession(payload))
    }
}

const LoginComponent = (props) => {

    const input_user = useRef();
    const input_password = useRef();

    return <>
        <>
            <div className="container container-form-principal " data-testid="container-login">
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
                                onClick={ev => doLogin(ev,input_user, input_password, props.updateSession)}>
                                <img src={loginIcon} alt="Login icon"/>
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        </>
    </>
}

export default connect(null, mapDispatchToProps)(LoginComponent);