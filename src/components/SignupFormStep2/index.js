import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SignupFormStep2.module.scss';
import cx from 'classnames';
import { addUser } from '../../store/actions/addUserAction';

const SignupFormStep2 = () => {
    const [values, setValues] = useState({
        dateDay: '',
        dateMonth: '',
        dateYear: '',
        gender: 'male',
        infoValue: ''
    });
    const [isValValid, setValidVal] = useState({
        isDateValid: false,
        isDateDayValid: false,
        isDateMonthValid: false,
        isDateYearValid: false,
        isAgeValid: false,
    });
    const { dateDay, dateMonth, dateYear, gender, infoValue } = values;
    const { isDateDayValid, isDateMonthValid, isDateValid, isDateYearValid, isAgeValid } = isValValid;

    const user = useSelector(state => state.userState.user);
    const dispatch = useDispatch();

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues(values => ({
            ...values,
            [name]: value,
        }));

        if (name === 'male' || name === 'female' || name === 'unspecified') {
            setValues(values => ({
                ...values,
                gender: value,
            }));
        }

        switch (name) {
            case 'dateDay':
                let dateDayValue = parseInt(value);
                setValidVal({
                    ...isValValid,
                    isDateDayValid: dateDayValue && dateDayValue <= 31 && dateDayValue >= 1
                });
                break;
            case 'dateMonth':
                let dateMonthValue = parseInt(value);
                setValidVal({
                    ...isValValid,
                    isDateMonthValid: dateMonthValue && dateMonthValue <= 12 && dateMonthValue >= 1
                });
                break;
            case 'dateYear':
                let dateYearValue = parseInt(value);
                setValidVal({
                    ...isValValid,
                    isDateYearValid: dateYearValue && dateYearValue <= 2019 && dateYearValue >= 1897
                });
                break;
            default:
                break;
        }
    }
    // let today = new Date().toLocaleDateString()
    // let dateOfBirth = `${dateMonth} ${dateDay} ${dateYear}`;



    useEffect(() => {

        let today = new Date();
        let birthDate = new Date(`${dateMonth} ${dateDay} ${dateYear}`);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (isDateDayValid && isDateMonthValid && isDateYearValid) {
            setValidVal(isValValid => ({
                ...isValValid,
                isDateValid: true,
                isAgeValid: age >= 18
            }))
        } else {
            setValidVal(isValValid => ({
                ...isValValid,
                isDateValid: false,
                isAgeValid: false
            }))
        }
    }, [isDateDayValid, isDateMonthValid, isDateValid, isDateYearValid, isAgeValid, dateMonth, dateDay, dateYear]);

    // useEffect(() => {
    //     if (isDateValid && isPasswordValid && isPasswordConfirmed) {
    //         dispatch(addUser(values))
    //     }
    // }, [dispatch, isDateValid, isPasswordValid, isPasswordConfirmed, values]);
    return (
        <div className={styles['form-step2']}>
            <div className={styles['form-step2__item']}>
                <div
                    className={cx(styles['form-step2__label'], { [styles['form-step2__label--invalid']]: !isDateValid })}
                >
                    {
                        // yeah, it looks scary :)
                        dateDay.length === 0 && dateMonth.length === 0 && dateYear.length === 0 ? 'date of birth is required' : !isDateValid ? 'date of birth should be valid' : !isAgeValid ? 'you must be 18 year old or more' : 'date of birth'
                    }
                </div>
                <div className={styles['form-date']}>
                    <input
                        className={styles['form-date__input']}
                        type="text"
                        name="dateDay"
                        placeholder="DD"
                        value={dateDay}
                        onChange={handleInputChange}
                    />
                    <input
                        className={styles['form-date__input']}
                        type="text"
                        name="dateMonth"
                        placeholder="MM"
                        value={dateMonth}
                        onChange={handleInputChange}
                    />
                    <input
                        className={styles['form-date__input']}
                        type="text"
                        name="dateYear"
                        placeholder="YYYY"
                        value={dateYear}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles['form-step2__item']}>
                <div
                    className={cx(styles['form-step2__label'], { [styles['form-step2__label--invalid']]: !isDateDayValid })}
                >
                    gender
                </div>
                <div className={styles['form-gender']}>
                    <label htmlFor="male" className={styles['form-gender__item-label']}>
                        <span className={styles['form-gender__item-label-text']}>male</span>
                        <input
                            className={styles['form-gender__item-input']}
                            type="radio"
                            id="male"
                            name="male"
                            value="male"
                            checked={gender === "male"}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="female" className={styles['form-gender__item-label']}>
                        <span className={styles['form-gender__item-label-text']}>female</span>
                        <input
                            className={styles['form-gender__item-input']}
                            type="radio"
                            id="female"
                            name="female"
                            value="female"
                            checked={gender === "female"}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="unspecified" className={styles['form-gender__item-label']}>
                        <span className={styles['form-gender__item-label-text']}>unspecified</span>
                        <input
                            className={styles['form-gender__item-input']}
                            type="radio"
                            id="unspecified"
                            name="unspecified"
                            value="unspecified"
                            checked={gender === "unspecified"}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            </div>
            <div className={styles['form-step2__item']}>
                <label
                    className={styles['form-step2__label']}
                    htmlFor="info">
                    where did you hear about us?
                </label>
                <select
                    className={styles['form-step2__input']}
                    type="password"
                    name="info"
                    id="info"
                    value={infoValue}
                    onChange={handleInputChange}
                >
                    <option value=""></option>
                    <option value="my invisible friend">My friend told me</option>
                    <option value="Thanos">Someone snapping their fingers</option>
                    <option value="zdes bil Serega">Privet Mir!</option>
                </select>
            </div>
        </div >
    )
}

export default SignupFormStep2;