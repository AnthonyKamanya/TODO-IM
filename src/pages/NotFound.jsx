import { Link } from 'react-router';
import styles from './NotFound.module.css';
const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <br />
      <p>page not found</p>
      <br />
      <Link to="/">Go Back home</Link>
    </div>
  );
};
export default NotFound;
