import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SignupFormSuccess.module.scss';

const SignupFormSuccess = () => {
    const userData = useSelector(state => state.userState.user);

    const handleButton = () => {
        const {
            email,
            password,
            dateMonth,
            dateDay,
            dateYear,
            gender,
            info
        } = userData;

        let obj = {
            user_data: {
                email,
                password,
                date_of_birth: Date.parse(`${dateMonth} ${dateDay} ${dateYear}`) / 1000,
                gender,
                how_hear_about_us: info ? info : null
            }
        };
        let myJSON = JSON.stringify(obj);
        console.log(myJSON)
    }

    return (
        <div className={styles['form-success']}>
            <div className={styles['form-success__pic']}></div>
            <button
                className={styles['form-success__btn']}
                type="button"
                onClick={handleButton}
            >Go to Dashboard <i className="fas fa-arrow-right"></i></button>
        </div>
    )
}

export default SignupFormSuccess;

