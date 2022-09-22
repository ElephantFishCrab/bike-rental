export class Singleton {
    protected static instances: Array<any>;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    public constructor() {
        this.initialize();
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance<T extends typeof Singleton>(this: T): InstanceType<T> {
        // Make instances an array if undefined
        if (Singleton.instances === undefined) {
            Singleton.instances = [];
        }

        // Look for an instance of the Singleton class
        let instance = Singleton.instances.find(_instance => _instance instanceof this);

        // Add an instance of current Singleton class if none
        if (instance === undefined) {
            instance = new this;
            Singleton.instances.push(instance);
        }

        return instance;
    }

    /**
     * Use instead of the singleton's constructor.
     *
     * @protected
     */
    protected initialize(): void {}
}
