import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../assets/css/Calendar.css";
import axios from "axios";

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get("http://localhost/nud-hub/API/apiCalls/read/readEvents.php")
      .then(function (response) {
        console.log(response.data);
        setEvents(response.data.data);
      });
  }, []);

  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();

  return (
    <>
      <div
        className="startcalendar"
        id="Calendar"
        style={{ marginBottom: "-50px" }}
      ></div>
      <div
        className="row calendar"
        style={{ marginTop: "10%", marginLeft: "0" }}
      >
        <div className="calendar-content">
          <div className="row">
            <div className="col-12">
              <h4>University Calendar</h4>
            </div>
          </div>

          <div className="row">
            <p className="sub-title">
              Events in {currentMonth} {currentYear}
            </p>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events.map((event) => {
              return {
                title: event.title,
                start: event.event_start,
                end: event.event_end,
              };
            })}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
