export function getAppointmentsForDay(state, day) {
  //retrieve the days object based on day name
  const matchDays = state.days.filter((days) => days.name === day);

  // if day is not found
  if (matchDays.length === 0) {
    return [];
  }

  // iterate through appointment array for the given day
 // apps = dayfound.appointments.map(appointId =>
   // state.interviewers[appoints])

  const appt = matchDays[0].appointments;
  const appoints = [];
  for (let a of appt) {
    appoints.push(state.appointments[a]);
  }
  return appoints;
}

export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }

  const { interviewers } = state;

  return {
    student: interview.student,
    interviewer: interviewers[interview.interviewer],
  };
};
