import React from "react";
import { EditCardVacation } from "./EditCardVacation";
import { RemoveCardVacation } from "./RemoveCardVacation";
export interface Button {
  checkAdmin: boolean;
  id: number;
}
export const RenderButtonsOfEditAndRemove = ({
  checkAdmin,
  description,
  checkOut,
  checkIn,
  price,
  destination,
  img,
  id,
}: any) => {

  
  return (
    <div>
      {checkAdmin ? (
        <div>
          <span>
            <RemoveCardVacation id={id} />

            <EditCardVacation
              id={id}
              checkIn={checkIn}
              checkOut={checkOut}
              description={description}
              price={price}
              destination={destination}
              checkAdmin={checkAdmin}
              img={img}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};
