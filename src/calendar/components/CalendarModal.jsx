import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setFormSubmited] = useState(false);

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValue, setFormValue] = useState({
    title: "Hans",
    notes: "Fonfach",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValue.title.length > 0 ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValue({ ...activeEvent }); //exparso todo el activeEvent
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Fechas incorrectas",
        "revisar las fechas incorrectas",
        "error"
      );
      return;
    }
    if (formValue.title.length <= 0) return;

    console.log(formValue);

    await startSavingEvent(formValue);
    closeDateModal();
    setFormSubmited();
  };

  const onDateChanged = (event, changing) => {
    setFormValue({
      ...formValue,
      [changing]: event,
    });
  };

  const onInputChange = ({ target }) => {
    //para poder cambiar el valor del input

    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValue.start}
              onChange={(event) => onDateChanged(event, "start")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValue.start}
              selected={formValue.end}
              onChange={(event) => onDateChanged(event, "end")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValue.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValue.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
