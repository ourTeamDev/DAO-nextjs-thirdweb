import { ChainId, ConnectWallet, useAddress, useContract, useNetwork } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useMemo,useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const address = useAddress();
  console.log("👋Wallet Address: ", address);

  const [network, switchNetwork] = useNetwork();

  /// editionDrop コントラクトを初期化
  const editionDrop = useContract("0xcf314019C7F59359232332643Ec2358Db8744b42", "edition-drop").contract;
  console.log("コントラクトチェック↓");
  console.log(editionDrop);
  // ユーザーがメンバーシップ NFT を持っているかどうかを知るためのステートを定義
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // NFTを観んてィングしている間を表すステート定義
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // ウォレットに接続されていなかったら処理しない
    if (!address) {
      console.log("ウォレットに接続されてないので処理しない↓");
      return;
    }
    // ユーザーがメンバーシップ NFT を持っているかどうかを確認する関数を定義
    // tokenid：0を保有しているか
    const checkBalance = async () => {
      try {
        const balance = await editionDrop!.balanceOf(address, 0);
        console.log("バランス↓");
        console.log(balance);

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
    console.log("checkBalance関数実行↓");
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
  if (!address){
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to The NEO DAO.
          </h1>
          <p></p>
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
        </main>
      </div>
    );
  }
  // テストネットがGoerliではなかったら警告
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
  // HOME画面を表示
  else if (hasClaimedNFT){
    return (
      <>
        <Layout title="THE NEO DAO">
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>🍪DAO Member HHome Page</h1>
              <p>Congratulations on being a member</p>
              <p>Here is your status</p>
            </main>
          </div>
        </Layout>
      </>
    );
  }

  // ウォレットと接続されていたらMintボタン表示
  else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Mint your free 🍪DAO Membership NFT</h1>
          <button disabled={isClaiming} onClick={mintNft}>
            {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
          </button>
        </main>
      </div>
    );
  }
};

export default Home;