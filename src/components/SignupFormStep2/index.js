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
        info: ''
    });
    const [isValValid, setValidVal] = useState({
        isDateValid: false,
        isDateDayValid: false,
        isDateMonthValid: false,
        isDateYearValid: false,
        isAgeValid: false,
    });
    const { dateDay, dateMonth, dateYear, gender, info } = values;
    const { isDateDayValid, isDateMonthValid, isDateValid, isDateYearValid, isAgeValid } = isValValid;
    const userData = useSelector(state => state.userState.user);
    let userDataLength = Object.entries(userData).length;
    const dispatch = useDispatch();

    const handleInputChange = e => {
        const { name, value } = e.target;

        if (name === 'male' || name === 'female' || name === 'unspecified') {
            setValues(values => ({
                ...values,
                gender: value,
            }));
        } else {
            setValues(values => ({
                ...values,
                [name]: value,
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

    useEffect(() => {
        return () => { return dispatch(addUser({ ...values, ...isValValid })); }

    }, [dispatch, values, isValValid]);

    useEffect(() => {
        if (userDataLength > 6) {
            setValues(() => ({
                dateDay: userData.dateDay,
                dateMonth: userData.dateMonth,
                dateYear: userData.dateYear,
                gender: userData.gender,
                info: userData.info
            }));

            setValidVal(() => ({
                isDateValid: userData.isDateValid,
                isAgeValid: userData.isAgeValid,
                isDateDayValid: userData.isDateDayValid,
                isDateMonthValid: userData.isDateMonthValid,
                isDateYearValid: userData.isDateYearValid,
            }));
        }
    }, []); // Why are you yelling at me? I just want componentDidMount

    return (
        <div className={styles['form-step2']}>
            <div className={styles['form-step2__item']}>
                <div
                    className={cx(styles['form-step2__label'], { [styles['form-step2__label--invalid']]: !isDateValid })}
                >
                    {
                        // yeah, it looks scary :)
                        !dateDay && !dateMonth && !dateYear ? (
                            'date of birth is required'
                        ) : (
                            !isDateValid
                        ) ? (
                                    'date of birth should be valid'
                                ) : (
                                    !isAgeValid
                                ) ? (
                                        'you must be 18 year old or more'
                                    ) : (
                                        'date of birth'
                                    )
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
                <div className={styles['form-step2__label']}>
                    gender
                </div>
                <div className={styles['form-gender']}>
                    <label
                        htmlFor="male"
                        className={cx(styles['form-gender__label'], { [styles['form-gender__label--checked']]: gender === "male" })}
                    >
                        <span
                            className={cx(styles['form-gender__label-text'], { [styles['form-gender__label-text--checked']]: gender === "male" })}
                        >
                            male
                        </span>
                        <input
                            className={styles['form-gender__input']}
                            type="radio"
                            id="male"
                            name="male"
                            value="male"
                            checked={gender === "male"}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label
                        htmlFor="female"
                        className={cx(styles['form-gender__label'], { [styles['form-gender__label--checked']]: gender === "female" })}
                    >
                        <span
                            className={cx(styles['form-gender__label-text'], { [styles['form-gender__label-text--checked']]: gender === "female" })}
                        >
                            female
                        </span>
                        <input
                            className={styles['form-gender__input']}
                            type="radio"
                            id="female"
                            name="female"
                            value="female"
                            checked={gender === "female"}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label
                        htmlFor="unspecified"
                        className={cx(styles['form-gender__label'], { [styles['form-gender__label--checked']]: gender === "unspecified" })}
                    >
                        <span
                            className={cx(styles['form-gender__label-text'], { [styles['form-gender__label-text--checked']]: gender === "unspecified" })}
                        >
                            unspecified
                        </span>
                        <input
                            className={styles['form-gender__input']}
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
                <div className={styles['form-step2__select-wrapper']}>
                    <select
                        className={styles['form-info']}
                        type="password"
                        name="info"
                        id="info"
                        value={info}
                        onChange={handleInputChange}
                    >
                        <option value=""></option>
                        <option value="my invisible friend">My friend told me</option>
                        <option value="Thanos">Someone snapping their fingers</option>
                        <option value="zdes bil Serega">Privet Mir!</option>
                    </select>
                </div>
            </div>
        </div >
    )
}

export default SignupFormStep2;