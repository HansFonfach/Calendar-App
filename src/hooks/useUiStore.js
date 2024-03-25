import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  //con el useSelectore tengo acceso al state

  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector(state => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal()); //llamo el dispatch de la accion de openDateModal que está en el uiSlice
  };

  const closeDateModal = () => {
    dispatch (onCloseDateModal()); //llamo el dispatch de la accion de openDateModal que está en el uiSlice
  };

  const toggleDateModal = () =>{
    (isDateModalOpen)
    ? openDateModal()
    : closeDateModal();
  }

  return {
    // propiedades
    isDateModalOpen,

    // metodos
    openDateModal,
    closeDateModal,
    toggleDateModal
  };
};
