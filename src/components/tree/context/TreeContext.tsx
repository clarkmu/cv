import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Branch, branchColors, generateBranches } from "../branching";
import useDim from "./useDim";

interface TreeStateType {
  displayIndex: number[];
  isSmallScreen: boolean;
  restartedAt: number;
}

interface TreeContextType {
  state: TreeStateType;
  setState: Dispatch<TreeStateType>;
  branches: Branch[];
  incrementDisplayIndex: () => void;
}

const INITIAL_STATE: TreeStateType = {
  displayIndex: [0],
  isSmallScreen: false,
  restartedAt: 0,
};

export const TreeContext = createContext<TreeContextType>({
  state: INITIAL_STATE,
  setState: () => null,
  branches: [],
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

  const [dim] = useDim();

  const branches = generateBranches(dim / 2);

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

  useEffect(() => {
    setState((s) => ({
      ...s,
      displayIndex: [0],
      restartedAt: new Date().getTime(),
      isSmallScreen: dim < 768,
    }));
  }, [dim]);

  return (
    <TreeContext.Provider
      value={{
        state,
        setState,
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
