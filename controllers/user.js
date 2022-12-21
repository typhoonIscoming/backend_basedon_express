import Database from './sql/sql-connection';


class UserHandle extends Database {
    constructor() {
        super();
        this.getUser = this.getUser.bind(this);
    }

    async getUser(req, res, next) {
        this.database.query('select * from user', (err, result) => {
            if (!err) {
                res.send({ data: result })
            } else {
                res.send(err)
            }
        })
    }
}

export default new UserHandle();
