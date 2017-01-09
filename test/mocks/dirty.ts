export class Orc {
    private name: string;
    private weapon: string;
    
    constructor(name: string) {
        this.name = name;
    }
}

export class Peon extends Orc {
    constructor(name: number) {
        super(name);
        this.weaponn = 'pickaxe';
    }
}

export class Grunt extends Orc {
    constructor(name: string) {
        super(name);
        this.weapon = 'axe';
    }
}
