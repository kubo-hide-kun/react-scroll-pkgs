# use-window-scroll-in-element

<div align="center">

**要素内でのウィンドウ位置を取得する React Hook**

[![npm version](https://img.shields.io/npm/v/use-window-scroll-in-element)](https://www.npmjs.com/package/use-window-scroll-in-element)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[ライブデモ](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [English](./README.md)

</div>

## 概要

`use-window-scroll-in-element` は、ユーザーがスクロールする際に**ウィンドウの上辺/下辺が対象要素内でどの位置にあるか**を計算する React Hook です。**ピクセル値**と**パーセンテージ値（0-100%）**の両方を返すため、スクロール連動 UI アニメーションの構築に最適です。

これはスクロールベースのアニメーションの**基本となるプリミティブ**です。以下の情報を追跡します：

- ウィンドウが要素内で何ピクセルスクロールしたか
- スクロール可能領域の何パーセントを通過したか
- ウィンドウが現在要素のスクロール可能領域内にあるか

## インストール

```bash
npm install use-window-scroll-in-element
```

または

```bash
yarn add use-window-scroll-in-element
```

## クイックスタート

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function MyComponent() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { position, fraction, isInside } = useWindowScrollInElement(targetRef);

  return (
    <div>
      <div ref={targetRef} style={{ height: '200vh' }}>
        {/* スクロール可能なコンテンツ */}
      </div>

      <div>
        <p>
          位置: {position.top}px / {position.bottom}px
        </p>
        <p>進捗: {(fraction.top * 100).toFixed(1)}%</p>
        <p>要素内: {isInside ? 'はい' : 'いいえ'}</p>
      </div>
    </div>
  );
}
```

## API リファレンス

### `useWindowScrollInElement(targetElmRef, options?)`

#### パラメータ

- **`targetElmRef`** (`React.RefObject<HTMLElement>`) - 必須

  - スクロール位置を追跡したい対象要素を指す React ref

- **`options`** (`Partial<Options>`) - オプション
  - 以下のプロパティを持つ設定オブジェクト：

#### オプション

| プロパティ                     | 型                                                   | デフォルト     | 説明                                                                                                                                                                          |
| ------------------------------ | ---------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scrollStartPosition`          | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | スクロール開始位置の計算に使用するウィンドウの基準点                                                                                                                          |
| `scrollEndPosition`            | `'window-top' \| 'window-center' \| 'window-bottom'` | `'window-top'` | スクロール終了位置の計算に使用するウィンドウの基準点                                                                                                                          |
| `disableValueChangesOffscreen` | `boolean`                                            | `false`        | `true`の場合、要素がビューポート外にあるときは `{position: {top: 0, bottom: 0}, fraction: {top: 0, bottom: 0}, isInside: false}` を返します。パフォーマンス最適化に有用です。 |
| `waitingMs`                    | `number`                                             | `undefined`    | スクロールイベントのスロットル遅延（ミリ秒）。指定しない場合、すべてのスクロールイベントで発火します。                                                                        |

#### 戻り値

以下のプロパティを持つオブジェクトを返します：

```typescript
{
  position: {
    top: number; // ウィンドウ上辺の位置（ピクセル、対象要素内）
    bottom: number; // ウィンドウ下辺の位置（ピクセル、対象要素内）
  }
  fraction: {
    top: number; // 位置をパーセンテージ（0-1）で表した値（スクロール可能領域に対する）
    bottom: number; // 位置をパーセンテージ（0-1）で表した値（スクロール可能領域に対する）
  }
  isInside: boolean; // ウィンドウが現在要素のスクロール可能領域内にあるか
}
```

### 値の理解

#### `position.top` と `position.bottom`

これらの値は、ウィンドウの上辺/下辺が対象要素内で**何ピクセル**スクロールしたかを表します：

- `position.top = 0` は、ウィンドウ上辺が要素の上端と揃ったとき
- `position.top` は下にスクロールするほど増加
- `position.bottom` は下辺の位置を同様に表します

**計算方法:**

- `getBoundingClientRect()` を使用してビューポート基準の位置を取得
- ビューポート座標を要素基準の座標に変換
- `scrollStartPosition` と `scrollEndPosition` の設定を考慮

#### `fraction.top` と `fraction.bottom`

これらの値は、**スクロール進捗をパーセンテージ**（0.0 から 1.0）で表します：

- `fraction.top = 0` はスクロール可能領域の開始位置
- `fraction.top = 1` はスクロール可能領域の終了位置
- 計算式: `position / scrollableHeight`

**注意:** 要素の高さがウィンドウの高さより小さい場合、`scrollableHeight` が負になる可能性があり、予期しない `fraction` 値になることがあります。

#### `isInside`

ウィンドウが現在要素のスクロール可能領域内にあるかを示すブール値。以下の用途に有用です：

- 条件付きレンダリング
- パフォーマンス最適化（`disableValueChangesOffscreen` と併用）
- 表示時のみアニメーションをトリガー

## 使用例

### 基本的なスクロール進捗インジケーター

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fraction } = useWindowScrollInElement(containerRef);

  return (
    <div>
      <div ref={containerRef} style={{ height: '300vh', padding: '2rem' }}>
        <h1>下にスクロールして進捗を確認</h1>
        {/* コンテンツ */}
      </div>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: '4px',
            background: 'blue',
            width: `${fraction.top * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
```

### スクロール連動アニメーション

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function AnimatedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { fraction, isInside } = useWindowScrollInElement(sectionRef, {
    disableValueChangesOffscreen: true, // パフォーマンス最適化
  });

  const opacity = isInside ? fraction.top : 0;
  const scale = 0.5 + fraction.top * 0.5; // 0.5から1.0にスケール

  return (
    <section ref={sectionRef} style={{ height: '200vh' }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          transition: 'opacity 0.1s, transform 0.1s',
        }}
      >
        <h2>スクロールに応じてフェードイン・スケール</h2>
      </div>
    </section>
  );
}
```

### ウィンドウ中心位置の追跡

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function CenterTrackedSection() {
  const ref = useRef<HTMLDivElement>(null);

  // ウィンドウ中心が要素を通過するときを追跡
  const { position, fraction } = useWindowScrollInElement(ref, {
    scrollStartPosition: 'window-center',
    scrollEndPosition: 'window-center',
  });

  return (
    <div ref={ref} style={{ height: '500vh' }}>
      <p>ウィンドウ中心位置: {position.top}px</p>
      <p>進捗: {(fraction.top * 100).toFixed(1)}%</p>
    </div>
  );
}
```

### パフォーマンス最適化

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function OptimizedComponent() {
  const ref = useRef<HTMLDivElement>(null);

  const result = useWindowScrollInElement(ref, {
    disableValueChangesOffscreen: true, // 画面外では更新を停止
    waitingMs: 16, // 約60fpsにスロットル
  });

  // 画面外の場合、resultは以下になります：
  // { position: {top: 0, bottom: 0}, fraction: {top: 0, bottom: 0}, isInside: false }

  return (
    <div ref={ref} style={{ height: '200vh' }}>
      {result.isInside && <div>表示時のみレンダリング！</div>}
    </div>
  );
}
```

## 動作の仕組み

### 内部実装

1. **スクロールイベントの監視**

   - `useWindowScrollEffect` フックを使用してウィンドウスクロールイベントを監視
   - `waitingMs` オプションに基づいてイベントをスロットル（`just-throttle` を使用）

2. **位置の計算**

   - `getBoundingClientRect()` を使用して要素位置を取得
   - 要素基準のウィンドウ端位置を計算
   - `scrollStartPosition` と `scrollEndPosition` を考慮：
     - `window-top`: `rect.top * -1` を使用
     - `window-center`: `windowHeight/2 - rect.top` を使用
     - `window-bottom`: `windowHeight - rect.top` を使用

3. **パーセンテージの計算**

   - スクロール可能な高さを計算: `elementHeight - windowHeight`
   - ピクセル位置をパーセンテージに変換: `position / scrollableHeight`

4. **Ref の処理**
   - `useRefValue` を使用してポーリングで ref の変更を処理
   - ref が交換されても更新が継続されることを保証

### 重要な注意事項

⚠️ **ウィンドウリサイズの処理**: 現在の実装では、ウィンドウサイズの変更に対して `resize` イベントではなく `scroll` イベントを監視しています。スクロールせずにウィンドウをリサイズした場合、問題が発生する可能性があります。リサイズオブザーバーを使用するか、`resize` イベントを別途監視することを検討してください。

⚠️ **負のスクロール可能高さ**: 要素の高さがウィンドウの高さより小さい場合、`scrollableHeight` が負になり、予期しない `fraction` 値になる可能性があります。アプリケーションコードでガードやクランプを追加することを検討してください。

## ブラウザサポート

- React 16.8+（Hooks が必要）
- ES6+をサポートするモダンブラウザ
- `getBoundingClientRect()` API を使用（広くサポートされています）

## TypeScript

このパッケージには TypeScript 定義が含まれています。追加の型パッケージは不要です。

```typescript
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

// 型は自動的に推論されます
const result = useWindowScrollInElement(ref);
// result.position.top: number
// result.fraction.top: number
// result.isInside: boolean
```

## 関連パッケージ

- **[react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)** - このフックを基に構築されたスクロール連動フリップブックアニメーションコンポーネント

## デモとドキュメント

- **[ライブデモ](https://react-scroll-pkgs.vercel.app/)** - インタラクティブな例とビジュアライゼーション
- **[GitHub リポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - ソースコードとイシュー

## ライセンス

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## コントリビューション

コントリビューションを歓迎します！コントリビューションガイドラインについては[GitHub リポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)を参照してください。
