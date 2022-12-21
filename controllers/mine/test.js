
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
    }
}

const detail = new Detail();
console.log(detail.handleGetData())
