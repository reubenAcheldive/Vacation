import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { IoTrashOutline } from "react-icons/io5";
import { deleteVacation } from "../../Api-Calls/vacationsApi/deleteVacation";
import { StateContext } from "../Context/StateContext";


export const RemoveCardVacation = ({ id }: any) => {

  const [deleteBtn, setDeleteBtn] = useState<null | boolean>(false);
  const { appState, setAppState } = useContext(StateContext);
  const { userData } = appState;

  const handelDelete = async (id: any) => {
    if (userData) {
      await deleteVacation(id);

      setDeleteBtn(!deleteBtn);
    }
  };
  useEffect(() => {
    setAppState({ ...appState, removeVacationBtn: deleteBtn });
  }, [deleteBtn]);

  return (
    <div>
      <Button variant="white" size="sm" onClick={() => handelDelete(id)}>
        <IoTrashOutline />
      </Button>
    </div>
  );
};
