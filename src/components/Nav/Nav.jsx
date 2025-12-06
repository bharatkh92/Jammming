import { NavLink } from "react-router";
import styles from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export default function Nav({ isLoggedIn, handleLogout, username }) {
  const handleNavLinkCss = ({ isActive }) => {
    return isActive ? `${styles.active} ${styles.link}` : `${styles.link}`;
  };
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={handleNavLinkCss}>
        Home
      </NavLink>
      <NavLink to="/app" className={handleNavLinkCss}>
        App
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          to="/"
          className={`${styles.buttons} ${styles.link}`}
          onClick={handleLogout}
        >
          Logout
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right-from-bracket"
            className={styles.icon}
          />
        </NavLink>
      ) : (
        <NavLink to="/app" className={`${styles.link} ${styles.buttons}`}>
          Login
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right-to-bracket"
            className={styles.icon}
          />
        </NavLink>
      )}
      <div className={styles.username}>
        <p>{username ? username : ""}</p>
      </div>
    </nav>
  );
}
