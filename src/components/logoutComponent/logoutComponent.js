import logout_icon from './logout_icon.png'
import './logoutComponent.css'
import { removeToken } from '../../utils'
import { removeSession } from '../../react_redux/slices/sessionSlide'
import { connect } from 'react-redux/es/exports'

const LogoutComponent = ({removeSession}) => {

    const logout = () => {
        if(window.confirm("¿Está segur@ que desea cerrar sesión?")) {
            removeToken(removeSession);
        }
    }

    return (
        <div className='position-absolute container-logout'>
            <img src={logout_icon} alt="Icono de logout" onClick={ev => logout()}/>
        </div>
    )
}

const mapToDispatchToProps = (dispatchEvent) => {
    return {
        removeSession() {
            dispatchEvent(removeSession());
        }
    }
}

export default connect(null, mapToDispatchToProps)(LogoutComponent);