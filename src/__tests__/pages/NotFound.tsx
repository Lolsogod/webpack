import styles from '../styles/notfound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.message}>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
