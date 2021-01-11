class Worker {
    // List of jobs available to this worker.
    jobs;

    constructor(creep) {
        this.creep = creep;
    }

    FindEnergy() {

    }
}

module.exports = {
    Worker = this.Worker
}