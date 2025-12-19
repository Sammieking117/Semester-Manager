import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CourseContext from "./context/CourseContext";

const Navbar = () => {
    const {theme, toggleTheme} = useContext(CourseContext);
    const isDark = theme === 'dark';
    const [on, setOn] = useState(false);
    const closeMenu = () => {
        setOn(false);
    }

    return ( 
        <div className="navbar">
            <header>
                 <h2>SEMGR</h2>
                    <div className="menu-icon" onClick={() => setOn(!on)}>
                        &#9776;
                    </div>
            </header>
            <nav className={on ? "active" : ""}>
                <ul>
                    <li>
                        <div className="toggle-switch">
                            <input
                             type="checkbox"
                             id="theme-toggle"
                             checked={isDark}
                             onChange={toggleTheme} />
                             <label htmlFor="theme-toggle"
                              className="slider"></label>
                        </div>
                    </li>
                    <li><Link to="/" onClick={closeMenu}>Dashboard</Link></li>
                    <li><Link to="/courseForm" onClick={closeMenu}>Add Course</Link></li>
                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Navbar;