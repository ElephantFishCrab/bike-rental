import React, {useEffect, useState} from 'react';
import './rentallist.scss';
import {Rental} from "../../entity/Rental";
import RentalItem from "../item/RentalItem";

interface BicycleListProps {
    rentals: Array<Rental | undefined>
    title?: string
}

const templateName = 'rentals-list';

function RentalsList(props: BicycleListProps) {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    useEffect(() => {
        if (props.rentals.length === 0) {
            setIsOpen(false);
        }
    }, [props]);

    function onExpandToggleButtonClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={templateName + (isOpen ? ' is-open': '')}>

            <button className={templateName + '__expand-toggle-button'} onClick={() => onExpandToggleButtonClick()}>
                {isOpen ? 'Close' : `Rentals (${props.rentals.length})`}
            </button>

            {/* Title */}
            <div className={templateName + '__header'}>
                <h2 className={templateName + '__title'}>{props.title}</h2>

                <button className={templateName + '__close-rental-menu-button btn btn-dark'} onClick={() => onExpandToggleButtonClick()}>
                    Close
                </button>
            </div>

            {/* Wrapper */}
            <div className={templateName + '__wrapper'}>
                { props.rentals.map( rental => {
                    return rental instanceof Rental && (
                        <RentalItem key={rental?.getId()} rental={rental}/>
                    )
                })}
            </div>
        </div>
    );
}

export default RentalsList;