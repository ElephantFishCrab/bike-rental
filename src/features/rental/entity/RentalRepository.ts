import {Singleton} from "../../Singleton";
import {store} from "../../../app/store";
import {Rental} from "./Rental";
import {addRental, endRental, getRentedBicycles} from "../../bicycle/entity/BicyclesStoreSlice";

export class RentalRepository extends Singleton {

    /**
     * Get available bicycles.
     */
    public getRentals(): Array<Rental | undefined> {
        return getRentedBicycles(store.getState());
    }

    /**
     * Add rental.
     *
     * @param rental The bicycle rental.
     */
    public addRental(rental: Rental): void {
        store.dispatch(addRental(rental));
    }

    /**
     * End rental.
     *
     * @param rental The rental to end.
     */
    public endRental(rental: Rental): void {
        store.dispatch(endRental(rental));
    }
}