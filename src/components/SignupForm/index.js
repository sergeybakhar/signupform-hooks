import React from 'react';
import styles from './SignupForm.module.scss';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep } from '../../store/actions/formStepsAction';
import ProgressBar from '../ProgressBar';
import SignupFormStep1 from '../SignupFormStep1';
import SignupFormStep2 from '../SignupFormStep2';
import SignupFormSuccess from '../SignupFormSuccess';

const SignupForm = () => {
    const step = useSelector(state => state.stepState.step);
    const userData = useSelector(state => state.userState.user);
    const dispatch = useDispatch();
    const handleSteps = step => {
        dispatch(nextStep(step))
    }

    const showSteps = step => {
        switch (step) {
            case 1:
                return <SignupFormStep1 />;
            case 2:
                return <SignupFormStep2 />;
            case 3:
                return <SignupFormSuccess />;
            default:
                return null;
        }
    }

    const isStepValid = data => {
        let isValid = true;
        const {
            isEmailValid,
            isPasswordConfirmed,
            isPasswordValid,
            isDateValid,
            isAgeValid
        } = data;

        if (isEmailValid && isPasswordConfirmed && isPasswordValid & step === 1) {
            isValid = false;
        } else if (isDateValid && isAgeValid && step === 2) {
            isValid = false;
        }

        return isValid;
    }

    return (
        <div className={styles.signup}>
            <h2 className={styles.signup__header}>{step === 3 ? 'Thank You!' : 'Signup'}</h2>
            <ProgressBar />
            {showSteps(step)}
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
                            type="button"
                            onClick={() => handleSteps(1)}
                            disabled={isStepValid(userData)}
                        >Next <i className="fas fa-arrow-right"></i></button>
                    </div>
                )
            }
        </div>
    )
}

export default SignupForm;