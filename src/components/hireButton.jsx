import { useState, useEffect } from "react";
// import ErrorText from "@ui/error-text";
import { Button, Spinner } from "react-bootstrap";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { abi, CONTRACT_ADDRESS } from "../lib/contract-config";

const HireButton = () => {
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
    const provAddress = "0x56cef7b74cc7121bb88c6d9b469819b5d32c9b22";
    const buyerAddress = account;
    const amount = 10000000000000;
    const options = {
      abi,
      chain: chainId,
      contractAddress: CONTRACT_ADDRESS,
      functionName: "createJob",
      params: {
        provider_: provAddress,
        buyer_: buyerAddress,
        amount_: amount,
      },
      msgValue: Moralis.Units.ETH("0.00001"),
    };
    fetch({
      params: options,
      onError: (err) => {5
        alert(err.error ? err.error.message : err.message);
        setTxLoading(false);
      },
      onSuccess: (tx) => {
        setTxLoading(true);
        tx.wait().then(() => {
          setTxLoading(false);
          // notifySuccess("Transaction Completed");
        });
      },
    });
  };
  return (
    <>
      <Button className="btn btn-primary btn-xl mb-7 d-block mx-auto text-uppercase" disabled={txLoading} onClick={onSubmit}>
        {txLoading ? <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" /> : "Hire"}
      </Button>
    </>
  );
};

export default HireButton;
