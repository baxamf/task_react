import styles from "./Error.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Error({ children, errorHandler }) {
  return (
    <div className={styles.primary}>
      <h2>{children}</h2>
      <AiFillCloseCircle onClick={errorHandler} />
    </div>
  );
}
