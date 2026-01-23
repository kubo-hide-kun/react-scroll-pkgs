# react-scroll-flip-book

<div align="center">

**スクロール連動フリップブックアニメーションコンポーネント for React**

[![npm version](https://img.shields.io/npm/v/react-scroll-flip-book)](https://www.npmjs.com/package/react-scroll-flip-book)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[ライブデモ](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [English](./README.md)

</div>

## 概要

`react-scroll-flip-book` は、ユーザーがスクロールする際に**連番画像フレームをcanvasに描画**することで、スクロール連動フリップブックアニメーションを作成するReactコンポーネントです。[`use-window-scroll-in-element`](https://www.npmjs.com/package/use-window-scroll-in-element) を基に構築されており、以下を自動的に処理します：

- スクロール進捗に基づくフレーム選択
- 画像フォーマット検出（AVIF、WebP、JPG、PNG）
- 画像のプリロードとキャッシュ
- 異なるフレームセット用のレスポンシブブレークポイント
- 適切なスケーリングでのcanvasレンダリング

ヒーローアニメーション、スクロールトリガーシーケンス、インタラクティブなストーリーテリング体験の作成に最適です。

## インストール

```bash
npm install react-scroll-flip-book
```

または

```bash
yarn add react-scroll-flip-book
```

**ピア依存関係:**
- React 16.8+（Hooksが必要）

## クイックスタート

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function App() {
  // フレームパスを準備（ブラウザ互換性のため複数フォーマットをサポート）
  const framePaths = Array.from({ length: 60 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/frames/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}> {/* スクロール可能なコンテナ */}
      <ScrollFlipBook
        defaultSource={{ framePaths }}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## APIリファレンス

### `<ScrollFlipBook />`

#### 必須プロパティ

- **`defaultSource`** (`object`)
  - **`framePaths`** (`Array<{ [encodeType in Encode]?: string }>`) - フレームオブジェクトの配列。各オブジェクトには異なる画像フォーマットのパスを含めることができます：
    ```typescript
    {
      avif?: string;  // AVIFフォーマット（最高の圧縮）
      webp?: string;  // WebPフォーマット（良好な圧縮）
      jpg?: string;   // JPEGフォーマット（フォールバック）
      png?: string;   // PNGフォーマット（フォールバック）
    }
    ```
    コンポーネントは自動的に最適なサポートフォーマットを選択します。
  - **`shouldBackGroundLoading?`** (`boolean`) - 他のソースが表示されているときにバックグラウンドで画像をロードするかどうか

#### オプションプロパティ

| プロパティ | 型 | デフォルト | 説明 |
|------|------|---------|-------------|
| `sources` | `Array<Source>` | `[]` | 異なるフレームセット用のレスポンシブブレークポイント。各ソースは画面幅 >= `breakPoint` のときに適用されます |
| `pause` | `boolean` | `false` | アニメーションを一時停止（現在のフレームで凍結） |
| `preLoadingSize` | `number` | `undefined` | 事前にロードするフレーム数。指定しない場合、すべてのフレームが一度にロードされます |
| `canvasSize` | `{ width: number; height: number }` | `{ width: 1920, height: 1920 }` | Canvas描画バッファサイズ（CSSサイズではありません）。高い値 = より高品質だがメモリ消費も増加 |
| `background` | `string` | `'transparent'` | Canvasの背景色または画像 |
| `positionFixed` | `boolean` | `false` | Canvasに `position: fixed` を使用（ヒーローセクションに有用） |
| `animationStartPosition` | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | アニメーションが開始するウィンドウ位置 |
| `animationEndPosition` | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | アニメーションが終了するウィンドウ位置 |
| `shouldChangeSourceOnResize` | `boolean` | `undefined` | リサイズ時に画面サイズに基づいてソースを変更（現在未実装） |
| `shouldBackGroundLoadingOnPause` | `boolean` | `undefined` | 一時停止中にバックグラウンドで画像をロード（現在未実装） |
| `onUpdateImage` | `(args: { index: number; progress: number }) => void` | `undefined` | フレームが変更されたときに発火するコールバック |
| `onPreloadImages` | `() => void` | `undefined` | プリロードが完了したときに発火するコールバック |

#### Source型

```typescript
type Source = {
  breakPoint: number;  // このソースを適用する最小画面幅（px）
  framePaths: { [encodeType in Encode]?: string }[];
  shouldBackGroundLoading?: boolean;
};
```

#### サポートされている画像フォーマット

コンポーネントは以下のフォーマットをサポートします（優先順位順）：
- `avif` - AVIFフォーマット（最高の圧縮、モダンブラウザ）
- `webp` - WebPフォーマット（良好な圧縮、広くサポート）
- `jpg` - JPEGフォーマット（ユニバーサルフォールバック）
- `png` - PNGフォーマット（フォールバック、透明度をサポート）

コンポーネントは自動的にブラウザサポートを検出し、最適な利用可能フォーマットを選択します。

## 使用例

### 基本的なフリップブック

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function BasicFlipbook() {
  const frames = Array.from({ length: 120 }, (_, i) => ({
    webp: `/animation/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/animation/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '300vh' }}> {/* 重要: スクロール可能な高さを提供 */}
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        style={{ 
          width: '100%', 
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      />
    </div>
  );
}
```

### 固定位置のヒーローアニメーション

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function HeroSection() {
  const heroFrames = Array.from({ length: 90 }, (_, i) => ({
    avif: `/hero/frame-${String(i).padStart(3, '0')}.avif`,
    webp: `/hero/frame-${String(i).padStart(3, '0')}.webp`,
    jpg: `/hero/frame-${String(i).padStart(3, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: heroFrames }}
        positionFixed={true}
        animationStartPosition="window-top"
        animationEndPosition="window-bottom"
        style={{
          width: '100%',
          height: '100vh',
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>ここにコンテンツ</h1>
      </div>
    </div>
  );
}
```

### レスポンシブフレームセット

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function ResponsiveFlipbook() {
  // モバイルフレーム（小さく、フレーム数も少ない）
  const mobileFrames = Array.from({ length: 60 }, (_, i) => ({
    webp: `/mobile/frame-${String(i).padStart(3, '0')}.webp`,
    jpg: `/mobile/frame-${String(i).padStart(3, '0')}.jpg`,
  }));

  // デスクトップフレーム（大きく、フレーム数も多い）
  const desktopFrames = Array.from({ length: 120 }, (_, i) => ({
    avif: `/desktop/frame-${String(i).padStart(4, '0')}.avif`,
    webp: `/desktop/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/desktop/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '400vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: mobileFrames }}
        sources={[
          {
            breakPoint: 768, // タブレット以上でデスクトップフレームを適用
            framePaths: desktopFrames,
          },
        ]}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

### プリロードとコールバック付き

```tsx
import { useState } from 'react';
import { ScrollFlipBook } from 'react-scroll-flip-book';

function FlipbookWithLoading() {
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const frames = Array.from({ length: 100 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
  }));

  return (
    <div style={{ height: '300vh' }}>
      {loading && <div>アニメーションを読み込み中...</div>}
      
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        preLoadingSize={10} // 10フレーム先までプリロード
        onPreloadImages={() => setLoading(false)}
        onUpdateImage={({ index, progress }) => {
          setCurrentFrame(index);
          console.log(`フレーム ${index} (${(progress * 100).toFixed(1)}%)`);
        }}
        style={{ width: '100%', height: '100vh' }}
      />
      
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        フレーム: {currentFrame} / {frames.length - 1}
      </div>
    </div>
  );
}
```

### カスタムCanvasサイズ

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function HighQualityFlipbook() {
  const frames = Array.from({ length: 150 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
  }));

  return (
    <div style={{ height: '400vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        canvasSize={{ width: 3840, height: 2160 }} // 高DPIディスプレイ用の4Kバッファ
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## 動作の仕組み

### 内部フロー

1. **スクロール進捗の検出**
   - 内部的に `useWindowScrollInElement` フックを使用
   - 進捗をパーセンテージ（0.0から1.0）として追跡
   - 要素がビューポート内にあるときのみ更新（`disableValueChangesOffscreen: true`）

2. **フレームインデックスの計算**
   - スクロールパーセンテージをフレームインデックスに変換: `Math.ceil(fraction.top * frameCount)`
   - 有効な範囲にクランプ: `0` から `frameCount - 1`

3. **画像フォーマットの選択**
   - AVIF、WebP、JPG、PNGのブラウザサポートを検出
   - 利用可能なフレームパスから最適なサポートフォーマットを選択
   - `supportsEncode` ユーティリティを使用（Imageロードでテスト）

4. **画像のロードとキャッシュ**
   - `useImageLoader` フックが画像キャッシュを管理
   - オンデマンドで画像をロード
   - `preLoadingSize` に基づいて事前にロード
   - 要素がビューポートに入ると、残りのすべてのフレームをプリロード

5. **Canvasレンダリング**
   - HTML5 Canvas APIを使用
   - カバー矩形を計算（object-fit: cover相当）
   - `calcCanvasScale` で高DPIディスプレイを処理
   - `drawImage()` APIを使用して画像を描画

### 重要な実装詳細

⚠️ **スクロール可能なコンテナが必要**: コンポーネントのラッパーは `height: 100%` なので、アニメーションを動作させるには**十分な高さ（例: `200vh`、`300vh`）を持つスクロール可能なコンテナを提供する必要があります**。コンポーネント自体はスクロール可能な領域を作成しません。

⚠️ **Canvasサイズ vs CSSサイズ**: `canvasSize` は**描画バッファサイズ**であり、CSS表示サイズではありません。コンポーネントは `calcCanvasScale` を使用してCanvasをCSS寸法に自動的にスケールします。高いバッファサイズは高DPIディスプレイでより高品質を提供しますが、メモリ消費も増加します。

⚠️ **フレームパスフォーマット**: 各フレームパスオブジェクトには、ブラウザ互換性のために複数のフォーマットを含める必要があります。コンポーネントは自動的に最適なサポートフォーマットを選択します。

## パフォーマンス考慮事項

### プリロード戦略

- **`preLoadingSize` なし**: すべてのフレームが即座にロードされる（小さなアニメーションに適している）
- **`preLoadingSize` あり**: フレームを段階的にロード（大きなアニメーションに適している）
- **表示時**: スムーズな再生のために残りのすべてのフレームを自動的にプリロード

### スロットリング

- スクロールイベントは内部的に30msにスロットル
- 画像プリロードはパフォーマンス問題を避けるために480msにスロットル
- 効率的なスロットリングのために `just-throttle` ライブラリを使用

### メモリ管理

- 画像は初回ロード後にメモリにキャッシュされる
- アニメーションを計画する際は、フレーム数と画像サイズを考慮
- モバイルデバイスでより小さなフレームを提供するためにレスポンシブ `sources` を使用

## ブラウザサポート

- React 16.8+（Hooksが必要）
- Canvas APIをサポートするモダンブラウザ
- 画像フォーマットサポート検出（AVIF、WebP、JPG、PNG）

## TypeScript

このパッケージにはTypeScript定義が含まれており、以下をエクスポートします：

```typescript
import { 
  ScrollFlipBook, 
  ScrollFlipBookProps,
  ENCODES,
  Encode 
} from 'react-scroll-flip-book';

// エクスポートされた型を使用
const props: ScrollFlipBookProps = { ... };

// 利用可能なエンコード型
const encodes: Encode[] = ['avif', 'webp', 'jpg', 'png'];
```

## 依存関係

- [`use-window-scroll-in-element`](https://www.npmjs.com/package/use-window-scroll-in-element) - スクロール位置追跡
- [`@seznam/compose-react-refs`](https://www.npmjs.com/package/@seznam/compose-react-refs) - Ref合成
- [`just-throttle`](https://www.npmjs.com/package/just-throttle) - イベントスロットリング

## 関連パッケージ

- **[use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)** - スクロール追跡に使用される基盤フック

## デモとドキュメント

- **[ライブデモ](https://react-scroll-pkgs.vercel.app/)** - インタラクティブな例とビジュアライゼーション
- **[GitHubリポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - ソースコードとイシュー

## ライセンス

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## コントリビューション

コントリビューションを歓迎します！コントリビューションガイドラインについては[GitHubリポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)を参照してください。
