import { useMemo } from "react";

export const branchColors = ["darkblue", "green", "grey", "brown", "orange"];

//Branching:
//  initNode at distanceR || distance
//  if branch.branchLength then
//    animateBranch
//    initNode(branch.nodes[0])
//    initNode(branch.nodes[1])

export interface Branch {
  distance: number;
  distanceR?: number;
  branchLength?: number;
  nodes?: (Branch | null)[];
}

export const generateBranches = (dim: number): Branch[] => {
  return useMemo(() => {
    const dims: { [int: number]: number } = Array.from(
      { length: 30 },
      (_, i) => i + 1
    ).reduce((acc, i) => ({ ...acc, [i]: Math.floor(dim / i) }), {});

    const scalingFactor = 200;
    const dimsT: { [int: number]: number } = Array.from(
      { length: 20 },
      (_, i) => i
    ).reduce((acc, i) => ({ ...acc, [i]: Math.PI * (i / scalingFactor) }), {});

    return [
      {
        distance: dims[7],
        distanceR: dims[6],
        branchLength: dimsT[14],
        nodes: [
          {
            distance: dims[5],
            branchLength: dimsT[8],
            nodes: [
              { distance: dims[12] },
              {
                distance: dims[6],
              },
            ],
          },
          {
            distance: dims[5],
            branchLength: dimsT[8],
            nodes: [
              { distance: dims[7] },
              {
                distance: dims[8],
                branchLength: dimsT[6],
                nodes: [{ distance: dims[8] }, { distance: dims[8] }],
              },
            ],
          },
        ],
      },
      {
        distance: dims[7],
        branchLength: dimsT[8],
        nodes: [
          {
            distance: dims[8],
            branchLength: dimsT[5],
            nodes: [
              {
                distance: dims[7],
                branchLength: dimsT[4],
                nodes: [
                  {
                    distance: dims[8],
                    branchLength: dimsT[3],
                    nodes: [{ distance: dims[9] }, { distance: dims[9] }],
                  },
                  { distance: dims[6] },
                ],
              },
              {
                distance: dims[12],
                branchLength: dimsT[4],
                nodes: [
                  {
                    distance: dims[12],
                  },
                  {
                    distance: dims[9],
                    branchLength: dimsT[3],
                    nodes: [
                      {
                        distance: dims[9],
                        branchLength: dimsT[2],
                        nodes: [{ distance: dims[9] }, { distance: dims[9] }],
                      },
                      { distance: dims[9] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            distance: dims[10],
            distanceR: dims[6],
            branchLength: dimsT[5],
            nodes: [
              {
                distance: dims[10],
              },
              {
                distance: dims[8],
                branchLength: dimsT[6],
                nodes: [null, { distance: dims[10] }],
              },
            ],
          },
        ],
      },
      {
        distance: dims[8],
        distanceR: dims[6],
        branchLength: dimsT[12],
        nodes: [
          {
            distance: dims[15],
            branchLength: dimsT[6],
            nodes: [
              {
                distance: dims[15],
                branchLength: dimsT[3],
                nodes: [
                  {
                    distance: dims[20],
                    branchLength: dimsT[3],
                    nodes: [{ distance: dims[20] }, { distance: dims[20] }],
                  },
                  {
                    distance: dims[20],
                    branchLength: dimsT[3],
                    nodes: [null, { distance: dims[20] }],
                  },
                ],
              },
              {
                distance: dims[15],
                branchLength: dimsT[2],
                nodes: [
                  {
                    distance: dims[20],
                    branchLength: dimsT[1],
                    nodes: [{ distance: dims[20] }, { distance: dims[20] }],
                  },
                  null,
                ],
              },
              // { distance: dims[15], branchLength: dims[20] }
            ],
          },
          {
            distance: dims[15],
            branchLength: dimsT[8],
            nodes: [
              {
                distance: dims[15],
                branchLength: dimsT[4],
                nodes: [
                  {
                    distance: dims[20],
                    branchLength: dimsT[3],
                    nodes: [{ distance: dims[20] }, { distance: dims[20] }],
                  },
                  {
                    distance: dims[20],
                    branchLength: dimsT[3],
                    nodes: [null, { distance: dims[20] }],
                  },
                ],
              },
              {
                distance: dims[15],
                branchLength: dimsT[4],
                nodes: [
                  {
                    distance: dims[20],
                    branchLength: dimsT[3],
                    nodes: [{ distance: dims[20] }, { distance: dims[20] }],
                  },
                  {
                    distance: dims[20],
                    branchLength: dimsT[2],
                    nodes: [null, { distance: dims[20] }],
                  },
                ],
              },
              // { distance: dims[15], branchLength: dims[20] }
            ],
          },
        ],
      },
      {
        distance: dims[10],
        branchLength: dimsT[6],
        nodes: [
          {
            distance: dims[11],
            branchLength: dimsT[4],
            nodes: [
              {
                distance: dims[12],
                branchLength: dimsT[3],
                nodes: [
                  {
                    distance: dims[13],
                    branchLength: dimsT[2],
                    nodes: [{ distance: dims[14] }, { distance: dims[14] }],
                  },
                  {
                    distance: dims[13],
                    branchLength: dimsT[1],
                    nodes: [
                      {
                        distance: dims[14],
                        branchLength: dimsT[1],
                        nodes: [{ distance: dims[10] }, { distance: dims[10] }],
                      },
                      { distance: dims[14] },
                    ],
                  },
                ],
              },
              {
                distance: dims[14],
              },
            ],
          },
          {
            distance: dims[11],
            branchLength: dimsT[4],
            nodes: [
              {
                distance: dims[10],
                distanceR: dims[16],
                branchLength: dimsT[3],
                nodes: [
                  {
                    distance: dims[13],
                    branchLength: dimsT[1],
                    nodes: [
                      {
                        distance: dims[14],
                        branchLength: dimsT[1],
                        nodes: [{ distance: dims[10] }, { distance: dims[10] }],
                      },
                      { distance: dims[14] },
                    ],
                  },
                  {
                    distance: dims[13],
                  },
                ],
              },
              {
                distance: dims[12],
                branchLength: dimsT[4],
                nodes: [
                  {
                    distance: dims[10],
                    branchLength: dimsT[3],
                    nodes: [
                      {
                        distance: dims[14],
                        branchLength: dimsT[2],
                        nodes: [{ distance: dims[10] }, { distance: dims[10] }],
                      },
                      { distance: dims[14] },
                    ],
                  },
                  {
                    distance: dims[13],
                    branchLength: dimsT[2],
                    nodes: [
                      {
                        distance: dims[14],
                        branchLength: dimsT[1],
                        nodes: [{ distance: dims[10] }, { distance: dims[10] }],
                      },
                      { distance: dims[14] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        distance: dims[8],
        branchLength: dimsT[8],
        nodes: [
          {
            distance: dims[8],
            branchLength: dimsT[6],
            nodes: [{ distance: dims[10] }, { distance: dims[10] }],
          },
          {
            distance: dims[8],
            branchLength: dimsT[6],
            nodes: [{ distance: dims[10] }, { distance: dims[10] }],
          },
        ],
      },
    ];
  }, [dim]);
};
