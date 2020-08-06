export function getAppointmentsForDay(state, day) {

  //retrieve the days object based on day name
  const matchDays = state.days.filter(days => days.name === day)

  // if day is not found
  if(matchDays.length === 0) {
   return [];
  }

  // iterate through appointment array for the given day
  const appt = matchDays[0].appointments 
  const appoints = [];
  for(let a of appt) {
    appoints.push(state.appointments[a])
  }
  return appoints
}