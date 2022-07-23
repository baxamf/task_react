import styles from "./Button.module.css";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.btn}>
      {children}
    </button>
  );
}
