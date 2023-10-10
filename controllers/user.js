import Database from './sql/sql-connection';


class UserHandle extends Database {
    // constructor(options) {
    //     super(options);
    //     this.getUser = this.getUser.bind(this);
    // }

    async getUser(req, res, next) {
        this.database.query('select * from user', (err, result) => {
            if (!err) {
                res.send({ data: result })
            } else {
                res.send(err)
            }
        })
    }

    getUserInfo(req, res) {
        this.database.query('select * from user where id=1', (err, result) => {
            if (!err) {
                res.send({ data: result })
            } else {
                res.send(err)
            }
        })
    }
}

export default new UserHandle();
