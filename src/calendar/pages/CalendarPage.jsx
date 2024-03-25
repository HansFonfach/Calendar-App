import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, FabbAddNew, NavBar, FabbDelete } from "..";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";






export const CalendarPage = () => {

  const {openDateModal} = useUiStore(); // traigo el metodo del openDateModal y luego lo inserto en el evento del doble click

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const {events, setActiveEvent} = useCalendarStore();

  const onDoubleClick = (event) => {
    //console.log({ DoubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
   setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <>
      <NavBar />
      

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal/>
      <FabbAddNew/>
      <FabbDelete/>
    </>
  );
};
