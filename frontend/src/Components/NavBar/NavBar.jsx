import style from "./NavBar.module.scss";
import { NavLink } from "react-router";

export const NavBar = () => {
  // TODO: Lav en nav bar med links til udforsk, kort, gemte og profil

  const navLinks = [
    { name: "Udforsk", path: "/udforsk" },
    { name: "Kort", path: "/kort" },
    { name: "Gemte", path: "/gemte" },
    { name: "Profil", path: "/profil" },
  ];

  return (
    <nav className={style.navbar}>
      <ul className={style["nav-links"]}>
        {navLinks.map((link) => (
          <li className={style["nav-item"]} key={link.name}>
            <NavLink className={style["nav-link"]} to={link.path}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
