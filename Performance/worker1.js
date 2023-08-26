const { parentPort, workerData } = require('worker_threads');

const complexCalculation = () => {
    let count = 0;
    for (let i = 0; i < 2000000000; i++) {
        count++;
    }
    return count;
};

parentPort.on('message', (port) => {
    port.postMessage(complexCalculation());
});
