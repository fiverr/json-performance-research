const { expect } = require('chai');

describe('string', async() => {
    it('Should parse the string', async() => {
        const test_data = JSON.parse(window.test_data.text);
        expect(test_data).to.have.property('gigs');

        // logs to a file
        console.log(JSON.stringify({string: window.performance.now()}));
    });
});