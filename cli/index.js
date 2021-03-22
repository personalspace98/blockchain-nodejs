const Auth = require('./auth/auth');
const Interface = require('./interface/interface');
const Blockchain = require('../blockchain');

class Main {
    constructor() {
        const bc = new Blockchain();
        this.init(bc);
    }

    async init(bc) {
        const auth = new Auth();
        const publicKey = await auth.init();
        if (publicKey) {
            const inter = new Interface();
            await inter.init(publicKey, bc);
        }
    }
}


module.exports = Main;