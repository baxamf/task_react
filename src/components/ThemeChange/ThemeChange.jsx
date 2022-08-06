import { useContext, useState } from "react";
import themeContext from "../../context/themeContext";
import styles from "./ThemeChange.module.css";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";

export default function ThemeChange() {
  const context = useContext(themeContext);
  const { theme, THEMES, setTheme } = context;

  const changeTheme = () => {
    theme === "dark" ? setTheme(THEMES.LIGHT) : setTheme(THEMES.DARK);
  };

  return (
    <div className={styles.btn} onClick={changeTheme}>
      {theme === "dark" ? <BsSunFill /> : <BsMoonFill />}
    </div>
  );
}
