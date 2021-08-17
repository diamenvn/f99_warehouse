import Cookies from 'js-cookie'


function LogoutComponent() {
    Cookies.remove('_session');
    window.location.href = "/";
}

export default LogoutComponent;