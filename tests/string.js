const { expect } = require('chai');
const { report } = require('../helpers');

describe('string', async() => {
    it('Should parse the string', async() => {
        const test_data = JSON.parse(window.test_data.text);
        expect(test_data).to.have.property('gigs');
        await report('string');
    });
});