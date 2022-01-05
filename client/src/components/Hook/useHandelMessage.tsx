import { useEffect, useState } from "react";

export const useHandelMessage = () => {
  const [massage, massageSet] = useState<string|null>(null);

  useEffect(() => {
    setTimeout(() => {
      massageSet(null);
    }, 3000);
  }, [massage]);

  return { massageSet, massage };
};
