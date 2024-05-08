import React from 'react';
import styles from './index.module.css';

function Footer() {
  return (
    <div className="container">
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Code Shaper
        </p>
      </footer>
    </div>
  );
}
export default React.memo(Footer);
