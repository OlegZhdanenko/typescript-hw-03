class Key {
    private signature: number;

    constructor() {
        this.setSignature();
    };

    private setSignature(): void {
        this.signature = Math.random()
    };

    public getSignature(): number {
        const { signature } = this;
        return signature;
    };
};

class Person {
    constructor(private key: Key) {};
    
    public getKey(): number {
        const homeKey = this.key.getSignature();
        return homeKey;
    };
};

abstract class House {
    public door: boolean;
    public tenants: Person[] = [];

    constructor(public key: Key) { 
        this.door = false;
    };
    
    public comeIn(person: Person): void {
        if (this.door) {
                this.tenants.push(person);
        };
        console.log('tenants =>', this.tenants);
    };
    
    public abstract openDoor(homeKey: number): void;
};

class MyHouse extends House {
    public openDoor(homeKey: number): void {
        if (homeKey === this.key.getSignature()) {
            this.door = true;
            console.log('Welcome home');
            return;
        };
        console.log('Sorry. Look for your key');
    };

    public closeDoor(): void {
        this.door = false;
        console.log('Door is closed again');
    }
}


const key = new Key();
console.log('key =>', key);

const person = new Person(key); 
console.log('person =>', person);
console.log('personKey =>', person.getKey());

const house = new MyHouse(key);
console.log('house =>', house);

house.openDoor(person.getKey());
house.comeIn(person);
house.closeDoor();

export {};