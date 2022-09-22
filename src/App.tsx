import React, {useEffect, useState} from 'react';
import './app.scss';
import Logo from "./features/layout/components/logo/Logo";
import BicycleList from "./features/bicycle/components/list/BicycleList";
import {BicycleRepository} from "./features/bicycle/entity/BicycleRepository";
import {Bicycle} from "./features/bicycle/entity/Bicycle";
import {store} from "./app/store";
import {Rental} from "./features/rental/entity/Rental";
import {RentalRepository} from "./features/rental/entity/RentalRepository";
import RentalsList from "./features/rental/components/list/RentalList";

const templateName = 'app';

function App() {
    const [bicycles, setBicycles] = useState<Array<Bicycle | undefined>>(BicycleRepository.getInstance().getAvailableBicycles());
    const [rentals, setRentals] = useState<Array<Rental | undefined>>(RentalRepository.getInstance().getRentals())

    // Handle store change to update list items
    function handleStoreChange() {
        setBicycles(BicycleRepository.getInstance().getAvailableBicycles());
        setRentals(RentalRepository.getInstance().getRentals());
    }

    store.subscribe(handleStoreChange);

    return (
        <div className={templateName}>
            <header className={templateName + "__header"}>
                <Logo />
            </header>

            <section className={templateName + '__content'}>
                <div className={templateName + '__content__bicycle-list'}>
                    <BicycleList title={'Rent a bike!'} bicycles={bicycles} />
                </div>

                <RentalsList title={'My rentals'} rentals={rentals} />
            </section>
        </div>
    );
}

export default App;
