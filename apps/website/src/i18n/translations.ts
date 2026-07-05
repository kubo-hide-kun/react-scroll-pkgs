export type Locale = 'en' | 'ja';

export const LOCALES: Locale[] = ['en', 'ja'];

export const DEFAULT_LOCALE: Locale = 'en';

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export type Translation = {
  htmlLang: string;
  localeToggleLabel: string;
  meta: {
    title: string;
    description: string;
  };
  hookMeta: {
    title: string;
    description: string;
  };
  nav: {
    hook: string;
    flipbook: string;
    github: string;
  };
  firstView: {
    tag: string;
    description: string;
    seeItInAction: string;
    scrollHint: string;
  };
  hookSection: {
    eyebrow: string;
    lead: string;
    features: Feature[];
  };
  hookDemo: {
    fadeRise: string;
  };
  flipbookSection: {
    eyebrow: string;
    lead: string;
    features: Feature[];
  };
  flipbookDemo: {
    frameLabel: string;
    caption: string;
  };
  codeSection: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  footer: {
    title: string;
    lead: string;
    openOnStackBlitz: string;
    openOnCodeSandbox: string;
    github: string;
    npm: string;
    meta: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    htmlLang: 'en',
    localeToggleLabel: '日本語',
    meta: {
      title: 'react-scroll-pkgs — Scroll-linked React UI libraries',
      description:
        'Turn the scrollbar into an animation timeline. Two tiny, zero-config React packages: use-window-scroll-in-element and react-scroll-flip-book.',
    },
    hookMeta: {
      title: 'use-window-scroll-in-element — React scroll-progress hook',
      description:
        'A zero-dependency React hook that reports how far the window has scrolled through any element, as pixels and as a 0 → 1 fraction. Wire it to progress bars, fades, and parallax.',
    },
    nav: {
      hook: 'Hook',
      flipbook: 'Flipbook',
      github: 'GitHub',
    },
    firstView: {
      tag: 'Scroll-linked React UI libraries',
      description:
        'Turn the scrollbar into an animation timeline. Two tiny, zero-config packages for building Apple-style scroll experiences in React.',
      seeItInAction: 'See it in action',
      scrollHint: 'Scroll',
    },
    hookSection: {
      eyebrow: 'Package 01 · The hook',
      lead: 'A primitive hook that reports exactly where the viewport sits inside any element — as raw pixels and as a 0 → 1 fraction. Bind that one number to width, opacity, transform… anything.',
      features: [
        {
          icon: '📐',
          title: 'px & fraction',
          body: 'Get both the pixel offset and a normalized 0–1 progress value for the top and bottom edges.',
        },
        {
          icon: '🎚️',
          title: 'Start / end anchors',
          body: 'Choose whether tracking begins and ends at the window top, center, or bottom.',
        },
        {
          icon: '🪶',
          title: 'Zero dependencies',
          body: 'A tiny throttled scroll listener. No context, no providers, no CSS to import.',
        },
      ],
    },
    hookDemo: {
      fadeRise: 'Fade & Rise',
    },
    flipbookSection: {
      eyebrow: 'Package 02 · The component',
      lead: 'Feed it a sequence of images and it draws one frame per scroll step to a canvas — preloading, scaling and cover-fitting for you. Scroll through the section below to flip all 162 frames.',
      features: [
        {
          icon: '🎞️',
          title: 'Canvas rendering',
          body: 'Frames are painted to a single canvas, so playback stays smooth even with hundreds of images.',
        },
        {
          icon: '⚡',
          title: 'Smart preloading',
          body: 'Loads frames just ahead of the scroll and supports avif / webp / jpg per encode.',
        },
        {
          icon: '📱',
          title: 'Responsive sources',
          body: 'Swap frame sets at breakpoints so mobile and desktop each get the right assets.',
        },
      ],
    },
    flipbookDemo: {
      frameLabel: 'frame',
      caption:
        'Keep scrolling — every frame is drawn to a canvas in sync with the scrollbar. No video, no timeline. Just images.',
    },
    codeSection: {
      eyebrow: 'Preview → Code',
      title: 'That was ~10 lines',
      lead: 'Everything you just scrolled through is driven by the snippet below. The height of the wrapper controls how much scrolling it takes to play; positionFixed pins the canvas while it plays.',
    },
    footer: {
      title: 'Build it yourself',
      lead: 'Fork the repo, open it in an online editor, and start wiring the scrollbar to your UI in seconds.',
      openOnStackBlitz: 'Open on StackBlitz',
      openOnCodeSandbox: 'Open on CodeSandbox',
      github: 'GitHub',
      npm: 'npm',
      meta: 'MIT Licensed · react-scroll-pkgs',
    },
  },
  ja: {
    htmlLang: 'ja',
    localeToggleLabel: 'English',
    meta: {
      title: 'react-scroll-pkgs — スクロール連動の React UI ライブラリ',
      description:
        'スクロールバーをアニメーションのタイムラインに変えましょう。設定不要の小さな 2 つの React パッケージ: use-window-scroll-in-element と react-scroll-flip-book。',
    },
    hookMeta: {
      title: 'use-window-scroll-in-element — スクロール進捗 React フック',
      description:
        '任意の要素をウィンドウがどこまでスクロールしたかを、ピクセルと 0 → 1 の割合で返す依存関係ゼロの React フック。プログレスバー・フェード・パララックスに配線できます。',
    },
    nav: {
      hook: 'フック',
      flipbook: 'フリップブック',
      github: 'GitHub',
    },
    firstView: {
      tag: 'スクロール連動の React UI ライブラリ',
      description:
        'スクロールバーをアニメーションのタイムラインに。React で Apple 風のスクロール表現を作るための、設定不要で軽量な 2 つのパッケージ。',
      seeItInAction: '実際に動かす',
      scrollHint: 'スクロール',
    },
    hookSection: {
      eyebrow: 'パッケージ 01 · フック',
      lead: 'ビューポートが任意の要素のどこに位置しているかを、ピクセル値と 0 → 1 の割合の両方で返すシンプルなフックです。その 1 つの数値を width・opacity・transform など、あらゆるスタイルに紐づけられます。',
      features: [
        {
          icon: '📐',
          title: 'ピクセル値と割合',
          body: '要素の上端・下端について、ピクセル単位のオフセットと 0〜1 に正規化した進捗値の両方を取得できます。',
        },
        {
          icon: '🎚️',
          title: '開始 / 終了アンカー',
          body: 'トラッキングの開始と終了を、ウィンドウの上端・中央・下端のどこにするか選べます。',
        },
        {
          icon: '🪶',
          title: '依存関係ゼロ',
          body: 'スロットル付きの小さなスクロールリスナーだけ。Context も Provider も、読み込む CSS もありません。',
        },
      ],
    },
    hookDemo: {
      fadeRise: 'フェード＆ライズ',
    },
    flipbookSection: {
      eyebrow: 'パッケージ 02 · コンポーネント',
      lead: '連番画像を渡すと、スクロールの各ステップごとに 1 フレームを canvas へ描画します。プリロード・拡大縮小・カバー表示まで自動。下のセクションをスクロールして 162 フレームすべてをめくってみてください。',
      features: [
        {
          icon: '🎞️',
          title: 'Canvas 描画',
          body: 'フレームは 1 枚の canvas に描画されるため、数百枚の画像でも滑らかに再生されます。',
        },
        {
          icon: '⚡',
          title: 'スマートなプリロード',
          body: 'スクロールの少し先のフレームを読み込み、エンコードごとに avif / webp / jpg に対応します。',
        },
        {
          icon: '📱',
          title: 'レスポンシブなソース',
          body: 'ブレークポイントごとにフレームセットを切り替え、モバイルとデスクトップそれぞれに最適なアセットを配信します。',
        },
      ],
    },
    flipbookDemo: {
      frameLabel: 'フレーム',
      caption:
        'スクロールを続けてください。すべてのフレームがスクロールバーと同期して canvas に描画されます。動画でもタイムラインでもなく、ただの画像です。',
    },
    codeSection: {
      eyebrow: 'プレビュー → コード',
      title: 'これでおよそ 10 行',
      lead: 'いまスクロールしてきた表現はすべて、下のスニペットだけで動いています。ラッパーの高さで再生に必要なスクロール量が決まり、positionFixed が再生中の canvas を固定します。',
    },
    footer: {
      title: '自分で作ってみる',
      lead: 'リポジトリをフォークしてオンラインエディタで開けば、数秒でスクロールバーを UI に配線しはじめられます。',
      openOnStackBlitz: 'StackBlitz で開く',
      openOnCodeSandbox: 'CodeSandbox で開く',
      github: 'GitHub',
      npm: 'npm',
      meta: 'MIT ライセンス · react-scroll-pkgs',
    },
  },
};
