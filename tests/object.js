const { expect } = require('chai');

describe('object', async() => {
    it('Should read the object', async() => {
        const test_data = window.test_data;
        expect(test_data).to.have.property('gigs');

        // logs to a file
        console.log(JSON.stringify({object: window.performance.now()}));
    });
});