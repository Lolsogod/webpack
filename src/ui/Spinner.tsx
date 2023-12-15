import styles from "../styles/spinner.module.scss";

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Spinner;

