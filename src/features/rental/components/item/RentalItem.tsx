import React, {useState} from 'react';
import './rentalitem.scss';
import {Rental} from "../../entity/Rental";
import {store} from "../../../../app/store";
import {endRental} from "../../../bicycle/entity/BicyclesStoreSlice";
interface RentalItemProps {
    rental: Rental
}

const templateName = 'rental-item';

function RentalItem(props: RentalItemProps) {
    function onEndRentalButtonClick() {
        store.dispatch(endRental(props.rental));
    }

    return (
        <article className={templateName}>
            <div className={templateName + '__wrapper'}>

                {/* Image */}
                <div className={templateName + '__image'}>
                    <img src={props.rental.getBicycle().getImage()} alt={props.rental.getBicycle().getName()}/>
                </div>

                {/* Info container */}
                <div className={templateName + '__info-container'}>
                    <div className={templateName + '__label'}>
                        <h5>{props.rental.getBicycle().getName()}</h5>
                    </div>

                    <div className={templateName + '__rental-price'}>
                        <p>{props.rental.getDisplayPrice()}</p>
                    </div>
                </div>

                <div className={templateName + '__cancel-rent-button'}>
                    <button className={'btn btn-danger'} onClick={() => onEndRentalButtonClick()}>
                        End rental
                    </button>
                </div>

            </div>
        </article>
    );
}

export default RentalItem;