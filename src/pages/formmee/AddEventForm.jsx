import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Item, GroupItem, Label } from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';
import { DateBox} from 'devextreme-react/date-box';
import { ButtonItem } from 'devextreme-react/form';
import {Button} from 'devextreme-react/button';
const AddEventForm = () => {
  const [numevent, setNumevent] = useState('');
  const [dateevent, setDateevent] = useState('');
  const [datefinevent, setDatefinevent] = useState('');
  const [datejour, setDatejour] = useState('');

  useEffect(()=>{
    console.log("eventData :", datefinevent);
    console.log("dateevent :", dateevent);
    console.log("datefinevent :", datefinevent);
    console.log("datejour :", datejour);
  }, [numevent, datefinevent, dateevent, datejour])


  function convertISOToDate(isoDateString) {
    // Parse the ISO date string
    const date = new Date(isoDateString);
  
    // Extract the month, day, and year
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();
  
    // Format the date as "MM/DD/YYYY"
    return `${day}/${month}/${year}`;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
        numevent :numevent,
      dateevent: convertISOToDate(dateevent),
      datefinevent: convertISOToDate(datefinevent),
      datejour: convertISOToDate(datejour),
    };
    console.log(eventData);

    try {
      const response = await axios.post('http://localhost:7000/nowork', eventData);
      console.log('Event added successfully:', response.data);
    } catch (error) {
      console.error('There was an error adding the event:', error);
    }
  };

  const formData = { numevent, dateevent, datefinevent, datejour };

  return (
    <form onSubmit={handleSubmit}>
      <Form formData={formData}>
        <GroupItem colCount={2} caption="Event Details">
          <Item dataField="numevent">
            <Label text="Numevent" />
            <TextBox
              value={numevent}
              onValueChanged={(e) => setNumevent(e.value)}
            />
          </Item>
          <Item dataField="dateevent" editorType="dxDateBox">
            <Label text="Date Event" />
            <DateBox
              value={dateevent}
              onValueChanged={(e) => setDateevent(e.value)}
            />
          </Item>
          <Item dataField="datefinevent" editorType="dxDateBox">
            <Label text="Date Fin Event" />
            <DateBox
              value={datefinevent}
              onValueChanged={(e) => setDatefinevent(e.value)}
            />
          </Item>
          <Item dataField="datejour" editorType="dxDateBox">
            <Label text="Date Jour" />
            <DateBox
              value={datejour}
              onValueChanged={(e) => setDatejour(e.value)}
            />
          </Item>
          <Item horizontalAlignment="right">
          <button type="submit">Add Event</button>
          </Item>
        </GroupItem>
      </Form>
    </form>
  );
};
export default AddEventForm;
