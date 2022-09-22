import CityBikeImage from '../../../assets/images/velocity_vilmer.jpg';
import RacingBikeImage from '../../../assets/images/fenix_slic_105.jpg';
import MtbBikeImage from '../../../assets/images/contessa_scale_900_comp.jpg';
import {BicycleRentalUnit} from "../../rental/entity/Rental";

export enum BicycleVariant {
    CITY =   'city',
    RACING = 'racing',
    MTB =    'mtb'
}

export enum BicycleSize {
    SMALL =  'small',
    MEDIUM = 'medium',
    LARGE =  'large',
}

export interface BicyclePrices {
    hour: number,
    day: number,
    week: number
}

export class Bicycle {
    protected id: number;
    protected name: string;
    protected variant: BicycleVariant;
    protected size: BicycleSize;
    protected prices: BicyclePrices;

    /**
     * Class constructor.
     *
     * @param name The bike name.
     * @param variant The variant, use BicycleVariant enum.
     * @param size The size, use BicycleSize enum.
     * @param prices The prices, use BicyclePrices interface.
     */
    constructor(name: string, variant: BicycleVariant, size: BicycleSize, prices: BicyclePrices) {
        this.id = Math.floor(Math.random() * 1000000);
        this.name =     name;
        this.variant =  variant;
        this.size =     size;
        this.prices =   prices;
    }

    /**
     * Get bicycle id.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Get bicycle name.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get bicycle variant.
     */
    public getVariant(): BicycleVariant {
        return this.variant;
    }

    /**
     * Get bicycle size.
     */
    public getSize(): BicycleSize {
        return this.size;
    }

    /**
     * Get rental prices.
     */
    public getPrices(): BicyclePrices {
        return this.prices;
    }

    /**
     * Get price per rental unit.
     *
     * @param unitName The unit name.
     */
    public getPricePerRentalUnit(unitName: string): number {
        switch (unitName) {
            case BicycleRentalUnit.HOUR:
                return this.prices.hour;
            case BicycleRentalUnit.DAY:
                return this.prices.day;
            case BicycleRentalUnit.WEEK:
                return this.prices.week;
            default:
                throw new Error(`Rental unit [${unitName}] is not valid`);
        }
    }

    /**
     * Get bike image.
     */
    public getImage(): string {
        switch (this.getVariant()) {
            case BicycleVariant.CITY:
                return CityBikeImage;
            case BicycleVariant.RACING:
                return RacingBikeImage;
            case BicycleVariant.MTB:
                return MtbBikeImage;
            default:
                throw new Error(`Invalid bicycle variant [${this.getVariant()}]`);
        }
    }
}