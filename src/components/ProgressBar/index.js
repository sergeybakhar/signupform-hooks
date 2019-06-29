import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProgressBar.module.scss'

const ProgressBar = () => {
    const step = useSelector(state => state.stepState.step);
    const handleBarCompletion = step => {
        if (step === 2) {
            return '66.66%';
        } else if (step === 3) {
            return '100%';
        }
    }

    return (
        <div className={styles['progress-bar']}>
            <div
                className={styles['progress-bar__mask']}
                style={{ width: handleBarCompletion(step) }}
            ></div>
        </div>
    )
}

export default ProgressBar;
