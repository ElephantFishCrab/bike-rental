import {Bicycle} from "../../bicycle/entity/Bicycle";

export enum BicycleRentalUnit {
    HOUR = 'hour',
    DAY =  'day',
    WEEK = 'week'
}

export class Rental {
    protected id: number;
    protected bicycle: Bicycle;
    protected duration: number;
    protected unit: BicycleRentalUnit;

    /**
     * The rental constructor.
     *
     * @param bicycle The bicycle to rent.
     * @param duration The duration to rent for.
     * @param unit The unit of rental furation.
     */
    constructor(bicycle: Bicycle, duration: number, unit: BicycleRentalUnit) {
        this.id = Math.floor(Math.random() * 1000000);
        this.bicycle = bicycle;
        this.duration = duration;
        this.unit = unit;
    }

    /**
     * Get rental id.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Get bicycle entity.
     */
    public getBicycle(): Bicycle {
        return this.bicycle;
    }

    /**
     * Get duration.
     */
    public getDuration(): number {
        return this.duration;
    }

    /**
     * Get unit.
     */
    public getUnit(): BicycleRentalUnit {
        return this.unit;
    }

    /**
     * Get rental price.
     */
    public getPrice(): number {
        return (this.getBicycle().getPricePerRentalUnit(this.getUnit()) * this.getDuration());
    }

    /**
     * Get display price string.
     */
    public getDisplayPrice(): string {
        let unitName = this.getUnit() === BicycleRentalUnit.HOUR ? 'hour/s' : this.getUnit();
        return `${this.getDuration()} x ${unitName}, ${this.getPrice()}kr`;
    }
}