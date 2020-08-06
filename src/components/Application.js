import React, {useState, useEffect} from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import  {getAppointmentsForDay}  from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

    // use axios to request /api/days and /api/appointments
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
    ]).then((all) => {
     // console.log(all);
      setState((prev) => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []); 

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
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
{<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>}
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map((app) => {return <Appointment key={app.id} {...app} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
