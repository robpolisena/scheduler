import React, {useState, useEffect} from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Rob Patrick",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "John Williams",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      },
    },
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Jenna Mansell",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
];


export default function Application(props) {
  
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then((response) => {
      console.log('useEffect has been called',response.data[0].name)
      setDays(response.data)
      console.log(days);
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={days}
  day={day}
  setDay={setDay}
/>
</nav>
{<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>}
      </section>
      <section className="schedule">
        {appointments.map((app) => {return <Appointment key={app.id} {...app} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
