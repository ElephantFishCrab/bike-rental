import React, {useState} from 'react';
import {Bicycle} from "../../entity/Bicycle";
import {BicycleRentalUnit, Rental} from "../../../rental/entity/Rental";
import './bicycleitem.scss';
import {store} from "../../../../app/store";
import {addRental} from "../../entity/BicyclesStoreSlice";

interface BicycleItemProps {
    bicycle: Bicycle
}

const templateName = 'bicycle-item';

function BicycleItem(props: BicycleItemProps) {
    const [selectedRentalUnit, setSelectedRentalUnit] = useState<BicycleRentalUnit>(BicycleRentalUnit.HOUR);
    const [duration, setDuration] = useState<number>(0);
    const [rentPrice, setRentPrice] = useState<number>(duration);

    /**
     * On change duration change.
     *
     * @param durationString
     */
    function onChangeDuration(durationString: string) {
        const duration = parseInt(durationString);
        if (selectedRentalUnit === BicycleRentalUnit.HOUR && duration >= 0) {
            setDuration(duration);
        }
    }

    /**
     * On select rental unit.
     *
     * @param unitName
     */
    function onSelectRentalUnit(unitName: string) {
        let rentalUnit = undefined;

        switch (unitName) {
            case BicycleRentalUnit.HOUR:
                rentalUnit = BicycleRentalUnit.HOUR;
                break;
            case BicycleRentalUnit.DAY:
                rentalUnit = BicycleRentalUnit.DAY;
                break;
            case BicycleRentalUnit.WEEK:
                rentalUnit = BicycleRentalUnit.WEEK;
                break;
            default:
                throw new Error(`Rental unit [${unitName}] is not valid.`);
        }

        setSelectedRentalUnit(rentalUnit);

        if (rentalUnit === BicycleRentalUnit.DAY || rentalUnit === BicycleRentalUnit.WEEK) {
            setDuration(1);
        }
    }

    /**
     * On rent button click.
     */
    function onRentButtonClick() {
        store.dispatch(addRental(new Rental(props.bicycle, duration, selectedRentalUnit)));
    }

    return (
        <article className={templateName}>
            <div className={templateName + '__wrapper'}>

                {/* Size */}
                <p className={templateName + '__size'}>{props.bicycle.getSize()} size</p>

                {/* Image */}
                <div className={templateName + '__image'}>
                    <img src={props.bicycle.getImage()} alt={props.bicycle.getName()}/>
                </div>

                <div className={templateName + '__bottom-content'}>

                    {/* Label */}
                    <div className={templateName + '__label'}>
                        <h5>{props.bicycle.getName()}</h5>
                    </div>

                    <div className={templateName + '__prices'}>
                        {Object.keys(props.bicycle.getPrices()).map((key, index) => {
                            return <p><strong>Per {key}</strong>{Object.values(props.bicycle.getPrices())[index]}kr</p>;
                        })}
                    </div>

                    {/* Rental form */}
                    <div className={templateName + '__rental-form'}>
                        <p>Rent for</p>
                        <input
                            className={templateName + '__rental-form__duration'}
                            type="number" value={duration}
                            onChange={event => onChangeDuration(event.currentTarget.value)}
                            disabled={selectedRentalUnit === BicycleRentalUnit.DAY || selectedRentalUnit === BicycleRentalUnit.WEEK}
                        />
                        <select className={templateName + '__rental-form__unit'} onChange={event => onSelectRentalUnit(event.currentTarget.value)}>
                            {Object.keys(props.bicycle.getPrices()).map(((key) => {
                                return <option id={key}>{key === BicycleRentalUnit.HOUR ? 'hour/s' : key}</option>;
                            }))}
                        </select>
                    </div>

                    {duration > 0 && (
                        <div className={templateName + '__rent-button__wrapper'}>
                            <button className={templateName + '__rent-button__wrapper btn'} onClick={() => onRentButtonClick()}>
                                Rent now!
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default BicycleItem;