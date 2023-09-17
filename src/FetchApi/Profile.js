const Profile = (props) => {
    return (

        <div>
        <h1>Hi!</h1>
                <h1>Name: {props.user != null ? props.user.name : null}</h1>
                <h1>Age: {props.user != null ? props.user.age : null}</h1>
                <img src= {props.user != null ? props.user.image: null} />
                </div>
    )
}

export default Profile;
