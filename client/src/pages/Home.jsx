import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const [ loggedIn, setLoggedIn ] = useState(true);

    const handleLougOut = () => {
        localStorage.removeItem("authToken");
        setLoggedIn(false);
    }


    useEffect(() => {
        if(!localStorage.getItem("authToken")) {
            navigate('/login');
        }
    }, [ loggedIn ]);

    return (
        <div className="home-page">
            <h1>Home Page</h1>

            <button onClick={handleLougOut} className="logout">Log Out</button>
        </div>
    )
};

export default Home;