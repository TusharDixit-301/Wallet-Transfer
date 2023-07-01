import { Card, Input, Loading, Row, Text } from "@nextui-org/react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { writeContract, waitForTransaction } from "@wagmi/core";
import RankNFTContract from "../../contracts/rank-nft.json";
import LPTokenContract from "../../contracts/LPTokenContract.json";      
import "react-toastify/dist/ReactToastify.css";
const AssignRank = () => {
  const [userAddress, setUserAddress] = React.useState("");
  const [rank, setRank] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmission = async () => {
    try {
      setLoading(true);
      const hash = await writeContract({
        address: RankNFTContract.address,
        abi: RankNFTContract.abi,
        functionName: "mint",
        args: [parseInt(rank), userAddress.toString()],
      });
      waitForTransaction(hash).then(async () => {
        let rankValue = getRankValue(parseInt(rank));
        const hash = await writeContract({
          address: LPTokenContract.address,
          abi: LPTokenContract.abi,
          functionName: "mint",
          args: [userAddress.toString(), parseInt(rankValue)],
        });
        waitForTransaction(hash).then(() => {
          setLoading(false);
          toast("Level Up 📈", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
      });
    } catch (err) {
      setLoading(false);
      toast.error(`${err.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  function getRankValue(rank) {
    switch (rank) {
      case 1:
        return 10000;
      case 2:
        return 8000;
      case 3:
        return 6000;
      case 4:
        return 3000;
      case 5:
        return 1500;
      default:
        return 1;
    }
  }
  return (
    <>
      <Card
        css={{
          background: "transparent",
          mh: "fit-content",
          marginBottom: "$10",
        }}
      >
        <Card.Header>
          <span className="text-xl bg-gradient-to-r bg-clip-text  text-transparent from-blue-500 via-purple-500 to-pink-500 animate-text">
            Assign Rank
          </span>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10", px: "$10" }}>
          <Input
            label="User Address"
            clearable
            bordered
            borderWeight="light"
            css={{ border: "$accents5", mb: "$10" }}
            placeholder="0x000..00"
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
            required
          />
          <Input
            label="Rank"
            clearable
            bordered
            borderWeight="light"
            css={{ border: "$accents1" }}
            placeholder="1-5"
            onChange={(e) => {
              setRank(e.target.value);
            }}
            required
          />
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <button
              onClick={handleSubmission}
              className="rounded-lg px-4 py-1 border  disabled:cursor-not-allowed disabled:opacity-50 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600 "
              disabled={userAddress === "" || rank === ""}
            >
              {loading ? (
                <Loading size="md" color={"white"} type="points" />
              ) : (
                "Submit"
              )}
            </button>
          </Row>
        </Card.Footer>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default AssignRank;
