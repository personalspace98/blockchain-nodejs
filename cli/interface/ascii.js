const ascii_text_generator = require('ascii-text-generator');
const json = require('../../package.json');

class Ascii {
    constructor() {
    }

    genAscii() {
        const input_text = json.name;
        const ascii_text = ascii_text_generator(input_text, "2");

        return ascii_text;
    }
}

module.exports = Ascii;
