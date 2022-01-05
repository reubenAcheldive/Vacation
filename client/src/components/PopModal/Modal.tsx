import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { StateContext } from "../Context/StateContext";
import { BtnModalShow } from "../Context/BtnModalShow";

export const ModalUpdateVacation = ({ comp, symbol }: any) => {
  const { setAppState, appState } = useContext(StateContext);
  const [show, setShow] = useState(false); // change to false dont forget

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setAppState({ ...appState, addNewVacationBtn: show });
  }, [show]);
  return (
   
      <BtnModalShow.Provider value={{ handleClose }}>
      
          <Button variant="" onClick={handleShow}>
            {symbol}
          </Button>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>{comp}</Modal.Body>
        </Modal>
      </BtnModalShow.Provider>
  
  );
};