const prompt = require('prompt');
const Wallet = require('../../wallet');
const ChainUtil = require('../../chain-util');
const wallet = new Wallet();

class Auth {

    constructor() {
    }

    async init() {
        return new Promise((resolve, reject) => {
            prompt.start();

            console.log('I want to \n[0]Generate new wallet \n[1]import wallet\n');
            prompt.get(['i'], function (err, result) {
                if (err) { return onErr(err); }
                if (result.i === '0') {
                    console.log('You\'re password');
                    // prompt.get(['password'], function (err, result) {
                    console.log("\x1b[31m", 'Keep your private key at all cost save!');
                    const newWallet = wallet.genKeys();
                    console.log("\x1b[37m", "\x1b[40m", `Public key: ${newWallet[0]}`);
                    console.log("\x1b[37m", "\x1b[40m", `Private key: ${newWallet[1]}`);
                    console.log('Do you want to continue? Y/N')
                    prompt.get(['o'], function (err, result) {
                        const o = result.o.toLowerCase();
                        if (o === 'y' || o === 'yes') {
                            process.stdout.write("\u001b[2J\u001b[0;0H");
                            return resolve([newWallet[0]]);
                        }
                    });
                    // });
                } else if (result.i === '1') {
                    console.log('What\'s you\'re private key?');
                    prompt.get(['key'], function (err, result) {
                        const wallet = ChainUtil.importPrivateKey(result.key);
                        console.log('You\'re public key: \n', wallet[0]);
                        return resolve(wallet[0]);
                    });
                } else {
                    Auth();
                }
            });

            function onErr(err) {
                console.log(err);
                reject(err);
                return 1;
            }
        })
    }

}

module.exports = Auth;