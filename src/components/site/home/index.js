function HomeComponent(props) {
    if (props.token) {
        window.location.href = "/dashboard";
    }else{
        window.location.href = "/login";
    }
}


export default HomeComponent;