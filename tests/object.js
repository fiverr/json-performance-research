const { expect } = require('chai');
const { report } = require('../helpers');

describe('object', async() => {
    it('Should read the object', async() => {
        const test_data = window.test_data;
        expect(test_data).to.have.property('gigs');
        await report('object');
    });
});