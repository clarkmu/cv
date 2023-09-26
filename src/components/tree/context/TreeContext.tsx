import React, {
  createContext,
  Dispatch,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Branch, branchColors, generateBranches } from "../branching";
import { usePrevious } from "@uidotdev/usehooks";

interface TreeStateType {
  dim: number;
  displayIndex: number[];
  isSmallScreen: boolean;
  restartedAt: number;
}

interface TreeContextType {
  state: TreeStateType;
  setState: Dispatch<TreeStateType>;
  branches: Branch[];
  containerRef: Ref<HTMLDivElement>;
  incrementDisplayIndex: () => void;
}

const INITIAL_STATE: TreeStateType = {
  dim: 0,
  displayIndex: [0],
  isSmallScreen: false,
  restartedAt: 0,
};

export const TreeContext = createContext<TreeContextType>({
  state: INITIAL_STATE,
  setState: () => null,
  branches: [],
  containerRef: null,
  incrementDisplayIndex: () => null,
});

export function useTreeContext(): TreeContextType {
  return useContext(TreeContext);
}

export default function TreeContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, setState] = useState<TreeStateType>(INITIAL_STATE);

  const previousDim = usePrevious(state.dim);

  const containerRef = useRef(null);

  const branches = generateBranches(state.dim / 2);

  const calcDim = () => {
    if (!containerRef.current) {
      return 0;
    }

    const curr: HTMLDivElement = containerRef.current;
    const w = curr.offsetWidth;
    const h = curr.offsetHeight;
    const dim = Math.floor(h < w ? h : w);
    // setState((s) => ({ ...s, dim, isSmallScreen: dim < 768 }));
    return dim;
  };

  const setDim = () => {
    const dim = calcDim();
    setState((s) => ({ ...s, dim, isSmallScreen: dim < 768 }));
  };

  const incrementDisplayIndex = () => {
    setState((s) => {
      const l = s.displayIndex.length;

      if (l === branchColors.length) {
        return s;
      }

      return {
        ...s,
        displayIndex: [...s.displayIndex, l],
      };
    });
  };

  const handleWindowResize = () => {
    const dim = calcDim();

    //mobile safari triggers window.resize onScroll...cool
    if (dim !== previousDim) {
      setDim();
      setState((s) => {
        return { ...s, displayIndex: [0], restartedAt: new Date().getTime() };
      });
    }
  };

  useEffect(() => {
    setDim();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
    // eslint-disable-next-line
  }, []);

  return (
    <TreeContext.Provider
      value={{
        state,
        setState,
        containerRef,
        branches,
        incrementDisplayIndex,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}

export const WithTreeContext = (Component: any) => {
  return function WrapperComponent(props: any) {
    return (
      <TreeContextProvider>
        <Component {...props} />
      </TreeContextProvider>
    );
  };
};
