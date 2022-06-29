export const CONTRACT_ADDRESS = "0xaab0f33263ab8b4b8b85a5079fb0666961fbd574";

export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID_",
        type: "uint256",
      },
    ],
    name: "cancelJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "provider_",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "createJob",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID_",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "emergancyReceiver_",
        type: "address",
      },
    ],
    name: "emergancyRelease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "s_platformFee_",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "provider",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "complete",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct Lancet.Job",
        name: "job",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "jobComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "provider",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "complete",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct Lancet.Job",
        name: "job",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "jobCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobID_",
        type: "uint256",
      },
    ],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "platformFee_",
        type: "uint256",
      },
    ],
    name: "setPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "jobs",
    outputs: [
      {
        internalType: "address payable",
        name: "provider",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "complete",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "runningJobs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_jobID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_platformFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
