import styles from "@/styles/spinner.module.scss";

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer} data-testid="spinner">
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Spinner;

