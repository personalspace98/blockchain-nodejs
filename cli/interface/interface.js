const Explorer = require('../../explorer/wallets');
const Ascii = require('./ascii');

const explorer = new Explorer();
const ascii = new Ascii();

class Interface {
    constructor() {
        // this.init(publicKey, bc);
    }

    async init(publicKey, bc) {
        console.log(ascii.genAscii());
        console.log('\n\n');
        console.log(`Public key: ${publicKey}`);
        // console.log(`You\re private key: ${privateKey}`);

        const balance = await explorer.getBalances(publicKey, bc);
        console.log(`Balance: ${balance[0].balance}`);
    }
}

module.exports = Interface;