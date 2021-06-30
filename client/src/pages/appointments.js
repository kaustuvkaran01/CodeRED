import React,{useState,useEffect} from 'react';


import queryString from "query-string";
const Appointments = () => {
  const { code } = queryString.parse(window.location.search);
  const [appointmentsData,setAppointmentsData] = useState("none");
  useEffect(() => {
    fetch(`http://localhost:3001/appointments?code=${code}`, {
      method:'GET',
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => setAppointmentsData(JSON.stringify(res)))
  },[code]);
  return (
    <>
    <div className="appointments-body">
        <h3 >Appointments</h3>
        <h5 className="Content">{appointmentsData}</h5>
    </div>
    </>
  );
}
export default Appointments;