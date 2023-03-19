import { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
// 接続中のネットワークを取得するため useNetwork を新たにインポートします。
import { ConnectWallet, ChainId, useNetwork, useAddress, useContract } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { Proposal } from "@thirdweb-dev/sdk";
import { AddressZero } from "@ethersproject/constants";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const address = useAddress();
  console.log("👋Wallet Address: ", address);

  const [network, switchNetwork] = useNetwork();

  // コントラクトオブジェクトを初期化（NFT/ガバナンストークン/投票コントラクト）
  const editionDrop = useContract("0xB74583E75aF5DcfF024d0FD1C1F6Ec862f9Dca60", "edition-drop").contract;
  const token = useContract("0xb9910CDb772fAb91140063d1da94c0316395c7b0", "token").contract;
  const vote = useContract("0x720A70fb09a20d2F17E6022733Ce3a998755238E", "vote").contract;

  // ステート管理を定義
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState<any>([]);
  const [memberMotivationPoint, setmemberMotivationPoint] = useState<any>([]);
  const [memberAddresses, setMemberAddresses] = useState<string[] | undefined>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // アドレスの長さを省略してくれる便利な関数
  const shortenAddress = (str: string) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  useEffect(() => {
    // もしウォレットに接続されていなかったら処理をしない
    if (!address) {
      return;
    }
    // ユーザーがメンバーシップ NFT を持っているかどうかを確認する関数を定義
    const checkBalance = async () => {
      try {
        const balance = await editionDrop!.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    // 関数を実行
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop!.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop!.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };
  
  // ウォレットと接続していなかったら接続を促す
  if (!address) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <font color ="lightgreen">THE NEO DAO.</font><br/>
            For your inovation.
          </h1>
          <p></p>
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
        </main>
      </div>
    );
  }
  // テストネットが Goerli ではなかった場合に警告を表示
  else if (address && network && network?.data?.chain?.id !== ChainId.Goerli) {
    console.log("wallet address: ", address);
    console.log("network: ", network?.data?.chain?.id);

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Goerli に切り替えてください⚠️</h1>
          <p>この dApp は Goerli テストネットのみで動作します。</p>
          <p>ウォレットから接続中のネットワークを切り替えてください。</p>
        </main>
      </div>
    );
  }
  // DAOメンバーにはホーム画面を表示
  else if (hasClaimedNFT){
    return (
      <Layout title="Home">
      <div className={styles.container}>
        <main className={styles.main}>
        <h1 className={styles.title}>DAO HOME</h1>
        <p>Check your status for prizes</p>
          <div>
            <div>
              <h2>■ Your status</h2>
              <table className="card">
              <thead>
                  <tr>
                    <th>Address  </th>
                    <th>  Token Amount  </th>
                    <th>  Motivation</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <th>{shortenAddress(address)}</th>
                  <th>{memberTokenAmounts[address]}</th>
                  <th>{memberTokenAmounts[address]}</th>
                </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      </Layout>
    );
  }
  // ウォレットと接続されていたら Mint ボタンを表示
  else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Mint your free THE NEO DAO Membership NFT</h1>
          <button disabled={isClaiming} onClick={mintNft}>
            {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </main>
      </div>
    );
  }
};

export default Home;