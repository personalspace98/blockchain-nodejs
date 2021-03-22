class Explorer {
    constructor() {

    }

    async explore(blockchain) {
        const wallets = await this.getWallets(blockchain);
        const combinedData = await this.getBalances(wallets, blockchain);
        return combinedData;
    }

    async getWallets(bc) {
        const allWallets = [];
        bc.chain.forEach((block) => {
            console.log('blockiii', block);
            [...block.data].forEach(transaction => {
                allWallets.push(transaction.input.address);
                [...transaction.outputs].forEach(output => {
                    allWallets.push(output.address);
                });
            });

            // console.log('tp.transactions', transaction);
            // allWallets.push(transaction.input.address);
        })
        return [... new Set(allWallets)];
    }

    async getBalances(addresses, blockchain) {
        let transactions = [];
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction);
        }));
        const combinedData = [];
        [...addresses].forEach(address => {

            // console.log('address', address);
            let balance = 0;
            const walletInputTs = transactions
                .filter(transaction => transaction.input.address === address);

            // console.log('walletInputTs', walletInputTs);
            // let startTime = 0;

            if (walletInputTs.length > 0) {
                walletInputTs.forEach((ts) => {
                    console.log('ts', ts);
                    if (ts.input.address === address) {
                        balance = ts.input.amount;
                        [...ts.outputs].forEach(output => {
                            balance -= output.amount;
                        });
                    }
                });
            }

            transactions.forEach(transaction => {
                // if (transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === address) {
                        balance += output.amount;
                    }
                });
                // }
            });

            combinedData.push({
                address,
                balance
            });
        });
        return combinedData
    }
}

module.exports = Explorer;