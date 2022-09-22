import {Singleton} from "../../Singleton";
import {Bicycle} from "./Bicycle";
import {getAvailableBicycles} from "./BicyclesStoreSlice";
import {store} from "../../../app/store";

export class BicycleRepository extends Singleton {

    /**
     * Get available bicycles.
     */
    public getAvailableBicycles(): Array<Bicycle | undefined> {
        return getAvailableBicycles(store.getState());
    }
}