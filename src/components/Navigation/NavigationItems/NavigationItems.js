import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigatioNItems = () => (
    <ul className='NavigationItems'>
        <NavigationItem link='/' active={true}>Burger Builder</NavigationItem>
        <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
);

export default navigatioNItems;