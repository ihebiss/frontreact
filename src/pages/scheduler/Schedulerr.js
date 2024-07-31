import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { resourcesData } from './data.js';

const currentDate = new Date(2021, 2, 25);
const views = [
  {
    type: 'month',
    name: 'Auto Mode',
    maxAppointmentsPerCell: 'auto',
  },
  {
    type: 'month',
    name: 'Unlimited Mode',
    maxAppointmentsPerCell: 'unlimited',
  },
  {
    type: 'month',
    name: 'Numeric Mode',
    maxAppointmentsPerCell: 2,
  },
];

const Schedulerr = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/nowork') // Assurez-vous que l'URL correspond à votre API
      .then(response => {
        const events = response.data.map(event => ({
          text: event.numevent,
          startDate: new Date(event.dateevent),
          endDate: new Date(event.datefinevent),
        }));
        setData(events);
      })
      .catch(error => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <Scheduler
      timeZone="America/Los_Angeles"
      dataSource={data}
      views={views}
      defaultCurrentView="Auto Mode"
      defaultCurrentDate={currentDate}
      height={730}
    >
      <Resource
        dataSource={resourcesData}
        fieldExpr="roomId"
        label="Room"
      />
    </Scheduler>
  );
};

export default Schedulerr;
