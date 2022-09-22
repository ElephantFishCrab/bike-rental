import React from 'react';
import './logo.scss';
import BicycleWheelLogo from '../../../../assets/images/bicycle-wheel.png';

const templateName = 'logo';

function Logo() {
    return (
        <div className={templateName}>
            <img className={templateName + '__wheel-logo'} src={BicycleWheelLogo} alt="Bicycle wheel logo"/>
            <p className={templateName + "__word--bike"}>Bike</p>
            <p className={templateName + "__word--rental"}>Rental</p>
            <p className={templateName + "__word--shop"}>Shop</p>
        </div>
    );
}

export default Logo;