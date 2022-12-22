
class Base {
    constructor() {

    }
    init() {
        return 'base data'
    }
}

class Detail extends Base {
    constructor() {
        super()
        // this.handleGetData = this.handleGetData.bind(this);
    }
    handleGetData() {
        console.log('===', this.init())
        return `${this.init()} and Detail`
    }
}

class Thrid extends Detail{
    constructor() {
        super();
    }

    getData() {
        console.log('thrid print', this.handleGetData())
    }
}

const detail = new Thrid();
console.log(detail.getData())
