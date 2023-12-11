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

import {
  Radians,
  Pixels,
  polarToCartesian,
  degreesToRadians,
  ONE_RADIAN,
  clearAllClosures,
} from "../lib/coords";

import { Branch, branchColors } from "../branching";
import { useTreeContext } from "./TreeContext";

interface BranchStateType {
  init: boolean;
  c: CanvasRenderingContext2D | null;
}

interface BranchContextType {
  state: BranchStateType;
  setState: Dispatch<BranchStateType>;
  ref: Ref<HTMLCanvasElement>;
  baseRotation: number;
}

const INITIAL_STATE: BranchStateType = {
  init: false,
  c: null,
};

export const BranchContext = createContext<BranchContextType>({
  state: INITIAL_STATE,
  setState: () => null,
  ref: null,
  baseRotation: 0,
});

export function useBranchContext(): BranchContextType {
  return useContext(BranchContext);
}

export default function BranchContextProvider({
  children,
  dim,
  strokeStyle,
  i,
  branches,
  isLastBranch,
  isSecondToLastBranch,
}: {
  children: ReactNode;
  dim: number;
  strokeStyle: (typeof branchColors)[number];
  i: number;
  branches: Branch;
  isLastBranch: boolean;
  isSecondToLastBranch: boolean;
}): JSX.Element {
  const {
    state: { isSmallScreen },
    incrementDisplayIndex,
  } = useTreeContext();

  const [state, setState] = useState<BranchStateType>(INITIAL_STATE);
  const ref = useRef(null);

  const { c, init } = state;

  const rootStep = dim / 25;

  const baseDistance = i * rootStep;

  //nudge last branch over to end of root
  const baseRotation: Radians = degreesToRadians(
    (isLastBranch ? i + 0.5 : i) * 60
  );

  const halfDim = Math.floor(dim / 2);

  const innerCircleDiameter = Math.floor(dim / (isSmallScreen ? 4 : 5));

  //starting at inner node rollingRadius, rollingTheta
  //  arc out from rollingTheta while currT < end
  function animateBranch(
    branches: Branch | null,
    rollingRadius: Pixels,
    rollingTheta: Radians,
    currT: Radians,
    end: Radians
  ) {
    if (!branches?.branchLength || !c) {
      return;
    }

    requestAnimationFrame(() => {
      c.beginPath();
      c.arc(0, 0, rollingRadius, rollingTheta - currT, rollingTheta + currT);
      c.strokeStyle = strokeStyle;
      c.stroke();

      if (currT < end) {
        animateBranch(
          branches,
          rollingRadius,
          rollingTheta,
          currT + ONE_RADIAN,
          end
        );
      } else if (branches.nodes) {
        if (branches.nodes[0]) {
          animateNode(
            branches.nodes[0],
            rollingRadius + branches?.distance,
            rollingTheta + currT,
            rollingRadius
          );
        }

        if (branches.nodes[1]) {
          animateNode(
            branches.nodes[1],
            rollingRadius + (branches?.distanceR || branches?.distance),
            rollingTheta - currT,
            rollingRadius
          );
        }
      }
    });
  }

  // animate outward line from rollingRadius to rollingRadius + branch.distance(R)
  function animateNode(
    branches: Branch | null,
    rollingRadius: Pixels,
    rollingTheta: Radians,
    currR: Pixels,
    callback?: () => void
  ) {
    if (!c) {
      return;
    }

    requestAnimationFrame(() => {
      const { x, y } = polarToCartesian(currR, rollingTheta);
      const { x: x2, y: y2 } = polarToCartesian(currR + 1, rollingTheta);

      c.moveTo(x, y);
      c.lineTo(x2, y2);
      c.strokeStyle = strokeStyle;
      c.stroke();

      if (currR <= rollingRadius - 1) {
        animateNode(branches, rollingRadius, rollingTheta, currR + 1, callback);
      } else {
        if (callback) {
          callback();
        }

        if (branches?.branchLength) {
          animateBranch(
            branches,
            rollingRadius,
            rollingTheta,
            0,
            branches.branchLength
          );
        }
      }
    });
  }

  //animate arc while curr < end
  function animateRoot(
    radius: Pixels,
    start: Radians,
    end: Radians,
    curr: Radians,
    currStart: Radians
  ) {
    if (!c) {
      return;
    }

    requestAnimationFrame(() => {
      c.beginPath();
      c.strokeStyle = strokeStyle;
      c.arc(0, 0, radius, currStart, curr);
      c.stroke();

      if (curr < end) {
        animateRoot(
          radius,
          start,
          end,
          curr + ONE_RADIAN,
          currStart + ONE_RADIAN
        );
      } else {
        if (!isSecondToLastBranch) {
          incrementDisplayIndex();
        }

        // node that branches out
        animateNode(branches, radius + rootStep, start, radius);

        //shorter node that connects to next taxa
        animateNode(null, radius + rootStep, end, radius, () => {
          if (isSecondToLastBranch) {
            incrementDisplayIndex();
          }
        });
      }
    });
  }

  //init canvas on init
  //clear timeouts and animationFrames on redraws
  useEffect(() => {
    if (!c) {
      return;
    }

    if (!init) {
      setState((s) => ({ ...s, init: true }));
      c.translate(halfDim, halfDim);
    } else {
      clearAllClosures();
    }

    c.lineWidth = 2;

    if (!isLastBranch) {
      //init base of arc for root
      const radius = innerCircleDiameter + baseDistance;
      animateRoot(radius, 0, Math.PI / 2, ONE_RADIAN, 0);
    } else {
      const end = baseDistance + innerCircleDiameter;
      animateBranch(branches, end, 0, 0, branches?.branchLength || 0);
    }
    // eslint-disable-next-line
  }, [state.c, dim]);

  //init canvas.context
  useEffect(() => {
    if (!state.c && ref.current) {
      const curr: HTMLCanvasElement = ref.current;
      setState((s) => ({ ...s, c: curr.getContext("2d") }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <BranchContext.Provider
      value={{
        state,
        setState,
        ref,
        baseRotation,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}
