/*
    Class - ProcessListener
 */

class ProcessListener {
    static listen() {
        process.on('exit', (code) => {
            console.log(`EXIT CODE ${code}`);
        });
        //
        process.on('message', (msg) => {
            console.log(`MESSAGE: ${msg}`);
        });
        //
        process.on('rejectionHandled', (reason, promise) => {
            console.log(`EJECTION HANDLED at: ${promise} reason: ${reason}`);
        });
        //
        process.on('uncaughtException', (err) => {
            console.log(`UNCAUGHT EXCEPTION: ${err}`);
        });
        //
        process.on('unhandledRejection', (reason, promise) => {
            console.log(`UNHANDLED REJECTION at: ${promise} reason: ${reason}`);
        });
        //
        process.on('warning', (warning) => {
            console.log(`WARNING: ${warning}`);
        });
        // TODO: Rest to be added
        console.log("ProcessListener started.....");
    }
}

module.exports = ProcessListener;
