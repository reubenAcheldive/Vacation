
import { MdEditNote } from "react-icons/md";
import { ModalUpdateVacation } from "../PopModal/Modal";
import { EditVacationByForm } from "../TempleteForm/EditVacationByForm";
export const EditCardVacation = ({
  id,
  
  description,
  checkOut,
  checkIn,
  price,
  destination,
  img,
}: any) => {
  
  
  return (
    <div>
      <ModalUpdateVacation
        symbol={<MdEditNote />}
        comp={
          <EditVacationByForm
            id={id}
            checkIn={checkIn}
            checkOut={checkOut}
            description={description}
            price={price}
            destination={destination}
            img={img}
          />
        }
        text="edit Vacation"
      />
    </div>
  );
};
