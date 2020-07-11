import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuider/>
      </Layout>
    </div>
  );
}

export default App;
