
const moment = require('moment');
const Train = require('../models/Train'); 
require("dotenv").config();

function calculateDepartureTime(train) {
  const scheduledDeparture = moment(train.departureTime, 'HH:mm');
  const delayMinutes = train.delay || 0;
  return scheduledDeparture.add(delayMinutes, 'minutes').valueOf();
}

exports.getTrains =async(req, res)=> {
  try {
    const currentTime = moment();
    const next12Hours = currentTime.clone().add(12, 'hours');

    const filteredTrains = await Train.find({
      departureTime: { $gte: currentTime.format('HH:mm'), $lt: next12Hours.format('HH:mm') },
    });

    const sortedTrains = filteredTrains.sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      if (b.tickets !== a.tickets) {
        return b.tickets - a.tickets;
      }
      return calculateDepartureTime(b) - calculateDepartureTime(a);
    });
    return res.json(sortedTrains);
  }
   catch (error) {
   return res.status(500).json({ error: 'Failed to fetch train schedules.' });
  }
}


