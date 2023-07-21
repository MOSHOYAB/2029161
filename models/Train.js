class Train {
  constructor(data) {
    this.trainNumber = data.trainNumber;
    this.departureTime = data.departureTime;
    this.delay = data.delay;
    this.sleeperAvailability = data.sleeperAvailability;
    this.acAvailability = data.acAvailability;
    this.sleeperPrice = data.sleeperPrice;
    this.acPrice = data.acPrice;
  }
}

module.exports = Train;
