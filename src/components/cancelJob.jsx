import { useState, useEffect } from "react";
// import ErrorText from "@ui/error-text";
import { Button, Spinner } from "react-bootstrap";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { abi, CONTRACT_ADDRESS } from "../lib/contract-config";

const CancelJobButton = () => {
  const { error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction();
  const [txLoading, setTxLoading] = useState(false);
  const { chainId } = Moralis;
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account, authenticate } = useMoralis();
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, account]);

  const onSubmit = () => {
    setTxLoading(true);
    const options = {
      abi,
      chain: chainId,
      contractAddress: CONTRACT_ADDRESS,
      functionName: "cancelJob",
      params: {
        jobID_: 1,
      },
    };
    fetch({
      params: options,
      onError: (err) => {
        alert(err.error ? err.error.message : err.message);
        setTxLoading(false);
      },
      onSuccess: (tx) => {
        setTxLoading(true);
        tx.wait().then(() => {
          setTxLoading(false);
          notifySuccess("Transaction Completed");
        });
      },
    });
  };
  return (
    <>
      <button className="btn btn-outline-gray btn-xl mb-7 d-block mx-auto text-uppercase" disabled={txLoading} onClick={onSubmit}>
        {txLoading ? <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" /> : "Cancel Job"}
      </button>
    </>
  );
};

export default CancelJobButton;
