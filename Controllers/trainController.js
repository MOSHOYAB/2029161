
const axios = require('axios');
const Train = require('../models/Train');
require('dotenv').config();

const API_BASE_URL = 'https://api.johndoerailways.com';

const COMPANY_NUMBER = 'YOUR_COMPANY_NUMBER';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

const fetchTrainData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trains`, {
      headers: {
        'Company-Number': COMPANY_NUMBER,
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    throw error;
  }
};

const trainController = {
  getTrains: async (req, res) => {
    try {
      const trainsData = await fetchTrainData();
      const currentTime = new Date().getTime();

      const twelveHoursLater = currentTime + 12 * 60 * 60 * 1000;
      const filteredTrains = trainsData.filter(train => {
        const departureTimestamp = new Date(train.departureTime).getTime();
        return departureTimestamp > currentTime && departureTimestamp < twelveHoursLater && train.delay <= 30;
      });

      const trains = filteredTrains.map(train => new Train(train));

      trains.sort((a, b) => {
        if (a.acPrice === b.acPrice) {
          if (a.sleeperAvailability === b.sleeperAvailability) {
            return b.departureTime - a.departureTime;
          }
          return b.sleeperAvailability - a.sleeperAvailability;
        }
        return a.acPrice - b.acPrice;
      });

      res.json(trains);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = trainController;
