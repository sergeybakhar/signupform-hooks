import React from 'react';
import styles from './App.module.scss';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className={styles.app}>
      <SignupForm />
    </div >
  );
}

export default App;
