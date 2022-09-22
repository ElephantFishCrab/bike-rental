import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';
import {Bicycle, BicyclePrices, BicycleSize, BicycleVariant} from "./Bicycle";
import {Rental} from "../../rental/entity/Rental";

export interface BicyclesState {
  available: Array<Bicycle | undefined>,
  rentals: Array<Rental | undefined>
}

// Rental prices for each model
const veloCityRentalPrices: BicyclePrices = {hour: 25, day: 100, week: 400};
const felixRentalPrices: BicyclePrices = {hour: 50, day: 200, week: 800};
const contessaRentalPrices: BicyclePrices = {hour: 45, day: 150, week: 600};

const initialState: BicyclesState = {
    available: [
        // VeloCity Vilmer
        new Bicycle('VeloCity Vilmer S', BicycleVariant.CITY, BicycleSize.SMALL, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer S', BicycleVariant.CITY, BicycleSize.SMALL, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer S', BicycleVariant.CITY, BicycleSize.SMALL, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer M', BicycleVariant.CITY, BicycleSize.MEDIUM, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer M', BicycleVariant.CITY, BicycleSize.MEDIUM, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer L', BicycleVariant.CITY, BicycleSize.LARGE, veloCityRentalPrices),
        new Bicycle('VeloCity Vilmer L', BicycleVariant.CITY, BicycleSize.LARGE, veloCityRentalPrices),

        // Fenix SLiC 105
        new Bicycle('Fenix SLiC 105 S', BicycleVariant.RACING, BicycleSize.SMALL, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 S', BicycleVariant.RACING, BicycleSize.SMALL, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 M', BicycleVariant.RACING, BicycleSize.MEDIUM, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 M', BicycleVariant.RACING, BicycleSize.MEDIUM, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 M', BicycleVariant.RACING, BicycleSize.MEDIUM, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 L', BicycleVariant.RACING, BicycleSize.LARGE, felixRentalPrices),
        new Bicycle('Fenix SLiC 105 L', BicycleVariant.RACING, BicycleSize.LARGE, felixRentalPrices),

        // Contessa Scale 900 Comp
        new Bicycle('Contessa Scale 900 Comp S', BicycleVariant.MTB, BicycleSize.SMALL, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp S', BicycleVariant.MTB, BicycleSize.SMALL, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp M', BicycleVariant.MTB, BicycleSize.MEDIUM, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp M', BicycleVariant.MTB, BicycleSize.MEDIUM, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp L', BicycleVariant.MTB, BicycleSize.LARGE, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp L', BicycleVariant.MTB, BicycleSize.LARGE, contessaRentalPrices),
        new Bicycle('Contessa Scale 900 Comp L', BicycleVariant.MTB, BicycleSize.LARGE, contessaRentalPrices),
    ],
    rentals: []
};

export const BicyclesStoreSlice = createSlice({
    name: 'bicycles',
    initialState,
    reducers: {
        addRental: (state, action: PayloadAction<Rental>) => {
            // Add rental only if bike is available
            if (state.available.filter(bicycle => bicycle?.getId() === action.payload.getBicycle().getId())) {
                // Add rental to rentals array
                state.rentals.push(action.payload);
                // Remove bike from available bikes array
                state.available = state.available.filter(bicycle => bicycle?.getId() !== action.payload.getBicycle().getId());
            }
        },
        endRental: (state, action: PayloadAction<Rental>) => {
            // Remove rental only if it exists
            if (state.rentals.filter(rental => rental?.getId() === action.payload.getId())) {
                // Remove rental from rentals array
                state.rentals = state.rentals.filter(rental => rental?.getId() !== action.payload.getId());
                // Reinstate the bicycle as available
                state.available.push(action.payload.getBicycle());
            }
        }
    }
});

export const { addRental, endRental } = BicyclesStoreSlice.actions;

export const getAvailableBicycles = (state: RootState) => state.bicycles.available;
export const getRentedBicycles = (state: RootState) => state.bicycles.rentals;

export default BicyclesStoreSlice.reducer;
