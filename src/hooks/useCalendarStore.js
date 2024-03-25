// este hook es el encargado de que cualquier interaccion con el store será a traves de este custom hook

import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar); //aqui tomo lo del store.
  const {user} = useSelector(state => state.auth); //obtengo el usuario desde el auth 

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {




    //si contiene el id, quiere decir que estoy actualizando
    if (calendarEvent._id) {
      //actualizando
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      //creando

      const {data} = await calendarApi.post('/events', calendarEvent);//calendar event es el body de la informacion que mando.
      console.log({data});
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = () =>{
    dispatch(onDeleteEvent());
  }

  return {
    //propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
