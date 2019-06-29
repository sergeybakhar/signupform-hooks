import React from 'react';
import styles from './SignupForm.module.scss';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep } from '../../store/actions/formStepsAction';

const SignupForm = () => {
    const step = useSelector(state => state.stepState.step);
    const dispatch = useDispatch();

    const handleSteps = step => {
        dispatch(nextStep(step))
    }
    console.log(step)
    return (
        <div className={styles.signup}>
            <h2 className={styles.signup__header}>Signup</h2>
            {
                step <= 2 && (
                    <div className={styles.signup__footer}>
                        {
                            step === 2 && (
                                <button
                                    className={cx(styles.signup__btn, styles['signup__btn--gray-txt'])}
                                    onClick={() => handleSteps(-1)}
                                >Back</button>
                            )
                        }
                        <button
                            className={styles.signup__btn}
                            onClick={() => handleSteps(1)}
                        >Next <i className="fas fa-arrow-right"></i></button>
                    </div>
                )
            }
        </div>
    )
}

export default SignupForm;