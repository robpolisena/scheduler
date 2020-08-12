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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
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
  function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const currentDayRemoveSpot = state.days.map((day) => {
      if (day.name === state.day && mode === "create") {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    // request to API to update the appointment with the interview
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days: currentDayRemoveSpot });
    });
  }
  // request to API  to delete appointment
  function cancelInterview(id, interview = null) {
    const currentDayAddSpot = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, interview).then((res) => {
      setState({ ...state, days: currentDayAddSpot });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
