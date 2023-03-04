# DAO を運用するための簡易アプリ

JavaScript だけでスマートコントラクトを扱うことができる、[thirdweb](https://thirdweb.com/) を使用

- [参考ページ UNCHAIN](https://app.unchain.tech/learn/ETH-DAO/section-1_lesson-3)

## 機能

1. DAO のメンバーシップ NFT をミント
2. DAO 独自のガバナンストークン
3. DAO ダッシュボードの作成（プロポーザルへの投票など）

## How to feat app

1. `npm install`で関連パッケージをインストール
2. `npm run start`を実行しプロジェクト開始

## 追加機能候補

- 別ページ
- API でデータ取得し、データ表示
- メンバー一覧
- 貢献度計算メソッド
  - メンバーに付与（ハッシュマップ？）
  - 貢献度順に並べる
  - 貢献度高いメンバーにトークン等付与

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template next-typescript-starter
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

### Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
