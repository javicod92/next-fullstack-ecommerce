import { StatusNotification } from "@/interfaces";
import styles from "./styles.module.css";

interface Props {
  status: StatusNotification;
  msj: string | null;
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={`${styles.notification} ${styles[status!]}`}>
      <div className={`${styles.statusBorder} ${styles[status!]}`} />
      <p>{msj}</p>
    </div>
  );
};
