import { useEffect, useState } from "react";

export default function useDim() {
  const [dim, setDim] = useState(0);

  useEffect(() => {
    const calcDim = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      setDim(w < h ? w : h);
    };

    calcDim();
    window.addEventListener("resize", calcDim);
    return () => window.removeEventListener("resize", calcDim);
  }, []);

  return [dim];
}
