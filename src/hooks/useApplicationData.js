import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // use axios to request /api/days and /api/appointments and /api/interviewers
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // function to make a new interview
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // request to API to update the appointment with the interview
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }));
  }
  // request to API  to delete appointment
  function cancelInterview(id, interview = null) {
    return axios.delete(
      `http://localhost:8001/api/appointments/${id}`,
      interview
    );
  }

  return { state, setDay, bookInterview, cancelInterview };
}
