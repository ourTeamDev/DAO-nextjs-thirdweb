import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;

// 環境変数を env ファイルから読み込む
/*
const { EDITION_DROP_ADDRESS } = loadEnvConfig(
    process.cwd()
).combinedEnv;
*/

// const editionDrop = sdk.getContract("0xB74583E75aF5DcfF024d0FD1C1F6Ec862f9Dca60", "edition-drop");
const editionDrop = sdk.getContract("0x34bC63763CFaBB91241a457dd86305b7a9E2CBaB", "edition-drop");

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: "Member's Limited THE NEO APPLE",
        description:
          "THE NEO DAO にアクセスすることができる限定アイテムです",
        // image: readFileSync("src/scripts/assets/NFT.jpg"),
        image: readFileSync("src/scripts/assets/NFT.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();