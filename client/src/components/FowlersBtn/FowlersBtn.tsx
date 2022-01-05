import { useContext, useEffect, useState } from "react";

import { Button, Icon, Label } from "semantic-ui-react";
import { createUserNameFavoriteVacation } from "../../Api-Calls/vacationsApi/createUserNameFavoriteVacation";
import { deleteUserNameFavoriteVacation } from "../../Api-Calls/vacationsApi/deleteUserNameFavoriteVacation";
import { updateFollow } from "../../Api-Calls/vacationsApi/updateFollow";
import { StateContext } from "../Context/StateContext";

export const FowlersBtn = ({ numberFowlers, id, defaultFollow }: any) => {
  const { appState } = useContext(StateContext);
  const { userData} = appState;

  const [active, setActive] = useState<boolean>(true);
  

  const [fowlers, setFowlers] = useState(numberFowlers);

  const setNewFollow = async (id: number, fowlers: number) => {
    const result = await updateFollow(id, fowlers);
    return result;
  };
  useEffect(() => {
    setActive(defaultFollow);
  }, [defaultFollow]);

  const handelClick = async () => {
    if (userData?.userName) {
      if (active) {
    

        // this function check iff user already like this vacation

        const result = await setNewFollow(id, fowlers + 1); // setNewFollow set follow to the vacation
        if (result) {
          await createUserNameFavoriteVacation(userData?.userName, id);

          setFowlers((prev: number) => prev + 1);
          setActive(!active);
         
        }
      } else {
        const result = await setNewFollow(id, fowlers - 1); // setNewFollow Unset follow to the vacation
        await deleteUserNameFavoriteVacation(id, userData?.userName);
        setActive(true);
        
        if (result) {
          setFowlers((prev: number) => prev - 1);
        }
      }
    }
  };
  return (
    <div>
      <div>
        <Button onClick={handelClick} as="div" labelPosition="right">
          <Button toggle active={active} color={active ? "green" : "red"}>
            <Icon name="heart" />
            {active ? "follow" : "Unfollow"}
          </Button>
          <Label as="a" basic color={active ? "green" : "red"} pointing="left">
            {fowlers === 0 ? "Follow " : fowlers}
          </Label>
        </Button>
      </div>
    </div>
  );
};
