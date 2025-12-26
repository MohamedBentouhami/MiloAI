import { NavLink } from "react-router-dom";
import "./nav-bar.css"

export default function NavBar() {
    return <nav className="navbar">

      <ul className="nav-list">
            <li className="nav-link">
                <NavLink to={"/"}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={"/chat"}>
                    ChatBot
                </NavLink>
            </li>
            <li>
                <NavLink to={"/reviews"}>
                    Review
                </NavLink>
            </li>
        </ul>
    </nav>
}