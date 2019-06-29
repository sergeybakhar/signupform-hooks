import React from 'react';
import styles from './SignupForm.module.scss';
import cx from 'classnames';

const SignupForm = () => {
    return (
        <div className={styles.signup}>
            <h2 className={styles.signup__header}>Signup</h2>
            <div className={styles.signup__footer}>
                <button className={cx(styles.signup__btn, styles['signup__btn--gray-txt'])}>Back</button>
                <button className={styles.signup__btn}>Next <i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default SignupForm;