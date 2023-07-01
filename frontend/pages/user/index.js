import { Card, Spacer, Text, Loading } from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import { useBalance, useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useState } from "react";
import NFTGallery from "../../components/NFTGallery";
import { Network, Alchemy } from "alchemy-sdk";
import UserNFTGallery from "../../components/UserNFTGallery";
import Image from "next/image";
import HeartImg from "../../public/Heart.gif";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { BiLinkExternal } from "react-icons/bi";

const UserDashboard = () => {
  const loyaltyPoints = 5500; // Hardcoded value for now
  //   const currentRank = "II"; // Hardcoded value for now
  const [currentRank, setCurrentRank] = useState(null);
  const { address, isDisconnected } = useAccount();
  const [redeemedNFTsCount, setRedeemedNFTsCount] = useState(0);
  const [platformPoints, setPlatformPoints] = useState(0);
  const { data: LPBalance, isLoading } = useBalance({
    address: address,
    token: "0xc55dc7125A964B2DDa161F99771ED624e2107857",
  });
  console.log("Balance", LPBalance);

  const config = {
    apiKey: "6CvmSQzcvce0QImFAUMS4OQNOqPrNzwq",
    network: Network.MATIC_MUMBAI,
  };

  const alchemy = new Alchemy(config);
  const router = useRouter();

  const { data: PPBalance } = useBalance({
    address: address,
    token: "0x38985c9E67CDC0De10e48De02a6b49c2727d331A",
  });
  console.log("Balance", LPBalance);

  const toRoman = (num) => {
    if (num == 0) return "0";
    const roman = ["I", "II", "III", "IV", "V"];
    return roman[num - 1];
  };

  const getNFTs = async () => {
    if (!address) return;
    const chain = EvmChain.MUMBAI;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain,
      tokenAddresses: ["0x7795b265301C9030F8DAD878A4c4Bbd7eC302dD0"],
      mediaItems: false,
      address: address,
    });

    const tokens = response.result;

    let highestRankToken = tokens[0];

    for (let i = 1; i < tokens.length; i++) {
      if (parseInt(tokens[i].tokenId) < parseInt(highestRankToken.tokenId)) {
        highestRankToken = tokens[i];
      }
    }

    const redeemedNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
      chain,
      tokenAddresses: ["0xf4b0e08127eC5d82Cae0c81DF37B284ED8f2Efd0"],
      mediaItems: false,
      address: address,
    });

    let redeemedNFTsCount = redeemedNFTs.result.length;
    console.log("Redeemed NFTs", redeemedNFTsCount);
    if (redeemedNFTsCount == undefined || redeemedNFTsCount == 0) {
        redeemedNFTsCount = 0;
    }
    setRedeemedNFTsCount(redeemedNFTsCount);

    let options = {
      contractAddresses: ["0xf4b0e08127eC5d82Cae0c81DF37B284ED8f2Efd0"],
    };

    //Call the method to get the nfts owned by this address
    let redeemedRes = await alchemy.nft.getNftsForOwner(address, options);

    //Logging the response to the console
    console.log("redeenedres", redeemedRes);

    // console.log("Highest Rank Token", highestRankToken.tokenId);
    if (highestRankToken == undefined) return 0;
    return highestRankToken.tokenId;
  };
  useEffect(() => {
    const fetchNFTs = async () => {
      const rank = await getNFTs();
      setCurrentRank(toRoman(rank));
    };

    fetchNFTs();
  }, [address]);
  console.log("Current Rank", currentRank);

  if (isDisconnected) {
    router.push("/");
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "50px",
        }}
      >
                <Card
          variant="bordered"
          isHoverable
          isPressable
          style={{
            padding: "15px",
            //   backgroundColor: "rgba(232, 254, 84, 0.2)",
            width: "300px",
          }}
        >
          <Card.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text h2 b size={18}>
              Platform Points
            </Text>
            <Text h1 b size={42}>
              {PPBalance && PPBalance.formatted}
            </Text>
          </Card.Body>
        </Card>
        <Card
          variant="bordered"
          isHoverable
          isPressable
          style={{
            padding: "15px",
            //   backgroundColor: "rgba(232, 254, 84, 0.2)",
            width: "300px",
          }}
        >
          <Card.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text h2 b size={18}>
              Current Rank
            </Text>
            <Text h1 b size={42}>
              {currentRank ? (
                currentRank
              ) : (
                <Loading type="spinner" color={"white"} />
              )}
            </Text>
          </Card.Body>
        </Card>
        <Card
          variant="bordered"
          isHoverable
          isPressable
          style={{
            padding: "15px",
            //   backgroundColor: "rgba(232, 254, 84, 0.2)",
            width: "300px",
          }}
        >
          <Card.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {LPBalance && (
              <>
                <Text h2 b size={18}>
                  Loyalty Points Earned
                </Text>
                <Text h1 b size={42}>
                  {LPBalance.formatted}
                </Text>
              </>
            )}
          </Card.Body>
        </Card>



        <Card
          variant="bordered"
          isHoverable
          isPressable
          style={{
            padding: "15px",
            //   backgroundColor: "rgba(232, 254, 84, 0.2)",
            width: "300px",
          }}
        >
          <Card.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text h2 b size={18}>
              NFTs Redeemed
            </Text>
            <Text h1 b size={42}>
            {redeemedNFTsCount !== null && redeemedNFTsCount !== undefined ? (
  redeemedNFTsCount
) : (
  <Loading type="spinner" color={"white"} />
)}
            </Text>
          </Card.Body>
        </Card>
        <Card
         className={styles.hoverCard} 
          variant="bordered"
          isHoverable
          isPressable
          style={{
            padding: "15px",
            //   backgroundColor: "rgba(232, 254, 84, 0.2)",
            width: "300px",
          }}
        >
          <Card.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="flex">
              <Text
                onClick={() => {
                  router.push("/nftGallery");
                }}
                h1
                b
                size={30}
              >
                Redeem More &nbsp;&nbsp;&nbsp;&nbsp; NFTs!&nbsp;&nbsp; 🔗
              </Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Spacer y={2} />
      <div>
        <div className="flex justify-center ">
          <h1
            className={`text-5xl pb-4 animate-text mt-4 pt-6 ${styles.heads}`}
          >
            {" "}
            Your Redeemed NFTs
          </h1>
          {/* <h1 className="pl-2 text-5xl">❤️‍🔥</h1> */}
          {/* <Image src={HeartImg} alt="heart"  /> */}
          <Image
            src={HeartImg}
            alt="heart"
            width={100}
            className="pl-2 mt-2 mb-2 pb-3 "
          />
        </div>

        <UserNFTGallery walletAddress={address} count={redeemedNFTsCount} chain={"MATIC_MUMBAI"} />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserDashboard), { ssr: false });
