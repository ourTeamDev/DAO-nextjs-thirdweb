import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

// const editionDrop = sdk.getContract("0xB74583E75aF5DcfF024d0FD1C1F6Ec862f9Dca60", "edition-drop");
const editionDrop = sdk.getContract("0x34bC63763CFaBB91241a457dd86305b7a9E2CBaB", "edition-drop");

(async () => {
  try {
    // オブジェクトの配列を渡すことで、条件を設定 
    // 必要であれば、複数の条件をそれぞれ異なる時期に設定することも可能
    // FYI: https://docs.thirdweb.com/typescript/sdk.tokendrop.claimconditions#tokendropclaimconditions-property
    const claimConditions = [
      {
        // いつになったらNFTのミントできるようになるか
        startTime: new Date(),
        // 上限となる最大供給量
        maxQuantity: 50_000,
        // NFT の価格
        price: 0,
        // 1 回のトランザクションでミントできる NFT の個数
        quantityLimitPerTransaction: 1,
        // トランザクション間の待ち時間
        // MaxUint256 に設定し、1人1回しか請求できないように設定
        waitInSeconds: MaxUint256,
      },
    ];
    await (await editionDrop).claimConditions.set("0", claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();