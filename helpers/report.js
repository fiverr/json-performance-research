module.exports = async name => {
    console.log(JSON.stringify({
        [`${name}-execution`]: parseInt(window.performance.now())
    }));
    await onload();
    await sleep(250);
    console.log(JSON.stringify({
        [`${name}-interactive`]: parseInt(window.performance.timing.domInteractive - window.performance.timeOrigin)
    }));
    console.log(JSON.stringify({
        [`${name}-loaded`]: parseInt(window.performance.timing.loadEventEnd - window.performance.timeOrigin)
    }));
    return;
}

const onload = () => new Promise((resolve) => {
    isReady() || (document.onreadystatechange = isReady);

    function isReady() {
        if (document.readyState === 'complete') {
            resolve();
            return true;
        };
        return false;
    }
});

const sleep = (num = 0) => new Promise((resolve) => setTimeout(resolve, Math.min(num, 1500)));
