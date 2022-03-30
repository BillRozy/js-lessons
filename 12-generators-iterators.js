'use strict'

const https = require('https');

const fetch = async (api) => {
    return new Promise((resolve, reject) => {
        https.get('https://' + api, (resp) => {
        let data = '';
    
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return resolve(data)
        });
    
        }).on("error", (err) => {
            return reject(err)
        });
    })

}

function* easyGenerator(n = 10) {
    for (let i = 0; i <= n; i++) {
        yield i
    }
}

const generators = {
    *easyGenerator(n = 10) {
        for (let i = 0; i <= n; i++) {
            console.log('before yield')
            yield i
        }
    },
    *innerGenerator(rounds) {
        while(rounds >= 0) {
            console.log('before yield *')
            yield* this.easyGenerator(rounds)
            rounds--
        }
    }
}

for (const result of generators.innerGenerator(3)) {
    console.log(result);
}

const iterator = generators.easyGenerator(5)

for (const iteration = iterator.next(); iteration.done; iteration = iterator.next()) {
    console.log( iteration.value );
}

const StartupAPICalls = function (...apis) {
    this.apis = apis
}

const timer = async (time) => {
    return new Promise((resolve) => {
        console.log('waiting timer')
        setTimeout(() => resolve(), 1000)
    })
}

StartupAPICalls.prototype = {
    constructor: StartupAPICalls,
    *[Symbol.iterator]() {
        for (const iter of this.apis) {
            console.log(iter)
            yield fetch(iter)
        }
    }
}

function* withTimer(time, ...generators) {
    for (const gen of generators) {
        yield* [timer(time).then(() => gen)]
    }
}

async function main () {
    for (const val of withTimer(1000, new StartupAPICalls('google.com', 'yandex.ru', 'mail.ru'), easyGenerator(5))) {
        console.log('val ' + await val)
    }
}

main()

