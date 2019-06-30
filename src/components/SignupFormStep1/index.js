import React, { useState } from 'react';
import styles from './SignupFormStep1.module.scss';
import cx from 'classnames';

// eslint-disable-next-line
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPassRegex = RegExp(/^[0-9a-zA-Z]{6,}$/)

const SignupFormStep1 = () => {
    const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
    const [isValValid, setValidVal] = useState({ isEmailValid: false, isPasswordValid: false, isPasswordConfirmed: false });
    const { email, password, confirmPassword } = values;
    const { isEmailValid, isPasswordValid, isPasswordConfirmed } = isValValid;

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));

        switch (name) {
            case 'email':
                setValidVal({ ...isValValid, isEmailValid: validEmailRegex.test(value) });
                break;
            case 'password':
                setValidVal({ ...isValValid, isPasswordValid: validPassRegex.test(value) });
                break;
            case 'confirmPassword':
                setValidVal({ ...isValValid, isPasswordConfirmed: password === value });
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles['form-step1']}>
            <div className={styles['form-step1__item']}>
                <label
                    className={cx(styles['form-step1__label'], { [styles['form-step1__label--invalid']]: !isEmailValid })}
                    htmlFor="email"
                >
                    {
                        email.length === 0 ? 'email is required' : !isEmailValid ? 'email should be valid' : 'email'
                    }
                </label>
                <input
                    className={styles['form-step1__input']}
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles['form-step1__item']}>
                <label
                    className={cx(styles['form-step1__label'], { [styles['form-step1__label--invalid']]: !isPasswordValid })}
                    htmlFor="password">
                    {
                        password.length === 0 ? 'password is required' : !isPasswordValid ? 'Password should be minimum 6 characters long' : 'password'
                    }
                </label>
                <input
                    className={styles['form-step1__input']}
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles['form-step1__item']}>
                <label
                    className={cx(styles['form-step1__label'], { [styles['form-step1__label--invalid']]: !isPasswordConfirmed })}
                    htmlFor="confirmPassword">
                    {
                        confirmPassword.length === 0 ? 'confirm password' : !isPasswordConfirmed ? 'password doesn\'t match' : 'password is confirmed'
                    }
                </label>
                <input
                    className={styles['form-step1__input']}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleInputChange}
                />
            </div>
        </div >
    )
}

export default SignupFormStep1;