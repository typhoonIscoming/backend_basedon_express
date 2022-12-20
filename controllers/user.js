


class UserHandle {
    constructor() {
        this.getUser = this.getUser.bind(this);
    }

    async getUser(req, res, next) {
        res.send({ name: 'Tse11' })
    }
}

export default new UserHandle();
