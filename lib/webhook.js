const https = require('https');
const url = require('url');

/**
 * Posts webhook with the data
 * @param  {Object} data Data object
 * @return {Promise}
 */
module.exports = ({text, channel = '#lab'}) => new Promise((resolve, reject) => {
    const webhook = process.env.npm_config_webhook || process.env.SLACK_WEBHOOK;

    if (!webhook) {
        console.log(text);
        resolve();
        return;
    }

    const data = {
        attachments: [{
            pretext: 'Research results',
            color: '#2980b9',
            text,
            mrkdwn_in: ['text'],
        }],
        channel,
        username: 'Researchbot',
        icon_emoji: ':microscope:',
    };

    const {
        hostname,
        path,
    } = url.parse(webhook);

    const options = {
        hostname,
        port: 443,
        path,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    };

    const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('end', resolve);
        res.on('data', resolve);
    });

    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
});
