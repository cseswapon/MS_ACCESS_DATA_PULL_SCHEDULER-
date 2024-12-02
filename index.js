const express = require('express');
const sql = require('msnodesqlv8');
const path = require('path');
const cron = require('node-cron'); 
const app = express();
const port = 3000;

const databasePath = path.join(__dirname, 'att2000.mdb');
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${databasePath};`;

function logDataWithDelay(data) {
  return new Promise((resolve) => {
    let index = 0;

    function logNextItem() {
      if (index < data.length) {
        console.log(data[index]);
        index++;
        setTimeout(logNextItem, 900); // Log with 0.9s delay
      } else {
        resolve();
      }
    }

    logNextItem();
  });
}

app.get('/data', (req, res) => {
  const query = `
    SELECT checkinout.USERID, checkinout.CHECKTIME, userinfo.name, userinfo.badgenumber
    FROM checkinout
    INNER JOIN userinfo ON checkinout.USERID = userinfo.USERID
  `;
  
  sql.query(connectionString, query, (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send('Database query error');
    }

    const getDateString = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

    const modifyData = [];
    const dateGroups = {};

    for (let i = 0; i < data.length; i++) {
      const dateKey = getDateString(data[i].CHECKTIME);
      const user = data[i].name;
      const machineUserId = data[i].USERID;
      const badgenumb = data[i].badgenumber;

      if (!dateGroups[user]) {
        dateGroups[user] = {};
      }
      if (!dateGroups[machineUserId]) {
        dateGroups[machineUserId] = {};
      }
      if (!dateGroups[badgenumb]) {
        dateGroups[badgenumb] = {};
      }
      if (!dateGroups[user][dateKey]) {
        dateGroups[user][dateKey] = [];
      }

      dateGroups[user][dateKey].push(data[i]);
    }

    for (const user in dateGroups) {
      for (const date in dateGroups[user]) {
        const group = dateGroups[user][date];

        group.sort((a, b) => new Date(a.CHECKTIME) - new Date(b.CHECKTIME));

        const checkin = group[0];
        const checkout = group[group.length - 1];

        modifyData.push({
          machineUserId: checkin.USERID,
          officeUserId: checkin.badgenumber,
          name: user,
          date: date,
          fast: { checkin: checkin.CHECKTIME },
          last: { checkout: checkout.CHECKTIME },
        });
      }
    }

    logDataWithDelay(modifyData)
      .then(() => {
        console.log("All data posted successfully");
      })
      .catch((err) => console.log("Error in logDataWithDelay:", err.message));

    res.status(200).send({ message: "All Data", data: modifyData });
  });
});

cron.schedule('*/5 * * * *', () => {
  console.log('Running cron job every minute');
  const axios = require('axios');
  axios.get('http://localhost:3000/data')
    .then(response => {
      console.log('Data fetched successfully:', response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// Schedule a cron job to call /data every 5 minutes
// cron.schedule('*/5 * * * *', () => {
//   console.log('Running cron job every 5 minutes');
  
//   // Step 1: Fetch data from the /data endpoint using GET request
//   axios.get('http://localhost:3000/data')
//     .then(response => {
//       console.log('Data fetched successfully:', response.data);

//       // Step 2: Send the fetched data in a POST request to another API
//       const postData = response.data.data;  // Extract the data you need for POST request

//       axios.post('https://another-api.com/endpoint', postData)
//         .then(postResponse => {
//           console.log('Data posted successfully:', postResponse.data);
//         })
//         .catch(postError => {
//           console.error('Error posting data:', postError);
//         });
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
