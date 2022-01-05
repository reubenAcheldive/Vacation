
import { FormAddNewVacation } from "../TempleteForm/FormAddNewVacation";
import { ModalUpdateVacation } from "../PopModal/Modal";

export const DisplaysAdminAddVacation = ( {checkAdmin}:any) => {
  

  return (
    <div  style={{padding: "2rem"}}>
      {checkAdmin ? (
        <ModalUpdateVacation
          symbol={"Create New Vacation"}
          text={"New Vacation"}
          comp={<FormAddNewVacation />}
        />
      ) : (
        null
      )}
    </div>
  );
};
