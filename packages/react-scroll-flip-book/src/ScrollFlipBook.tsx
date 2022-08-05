import composeRefs from '@seznam/compose-react-refs';
import throttle from 'just-throttle';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

import { useImageLoader } from './hooks/useImageLoader';
import { useWindowInitialSize } from './hooks/useWindowInitialSize';
import { useWindowResizeEffect } from './hooks/useWindowResizeEffect';
import { TargetEncode } from './types/encode';
import { calcCanvasScale, calcCoverRect } from './utils/canvas';

type Props = {
  defaultSource: {
    framePaths: { [encodeType in TargetEncode]?: string }[];
    shouldBackGroundLoading?: boolean;
  };
  sources: {
    breakPoint: number;
    framePaths: { [encodeType in TargetEncode]?: string }[];
    shouldBackGroundLoading?: boolean;
  }[];
  pause?: boolean;
  preLoadingSize?: number;
  canvasSize?: { width: number; height: number };
  background?: string;
  positionFixed?: boolean;
  animationStartPosition?: 'window-top' | 'window-center' | 'window-bottom';
  animationEndPosition?: 'window-top' | 'window-center' | 'window-bottom';
  shouldChangeSourceOnResize?: boolean;
  shouldBackGroundLoadingOnPause?: boolean;
  onUpdateImage?: (args: { index: number; progress: number }) => void;
  onPreloadImages?: VoidFunction;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * @param defaultSource
 * @param defaultSource.framePaths 表示するアニメーションのフレームの配列
 * @param defaultSource.shouldBackGroundLoading 他のsourceが表示されている場合もバックグラウンドで画像をロードするか？
 * @param sources
 * @param sources[n].breakPoint 適用したい最小の画面サイズ
 * @param sources[n].framePaths 表示するアニメーションのフレームの配列
 * @param sources[n].shouldBackGroundLoading 他のsourceが表示されている場合もバックグラウンドで画像をロードするか？
 * @param pause アニメーションを一時停止させるためのフラグ
 * @param preLoadingSize 何フレーム先まで事前に読み込むか（未指定の場合は全フレームを一括で取得）
 * @param canvasSize キャンバスサイズ（描画バッファサイズ）
 * @param background 背景色・背景画像
 * @param animationStartPosition このコンポーネント上辺がどの位置に達した時点でアニメーションを開始させるかを指定します。
 * @param animationStartPosition このコンポーネント下辺がどの位置に達した時点でアニメーションを終了させるかを指定します。
 * @param shouldChangeSourceOnResize 'true' なら画面サイズ変更度にそのサイズに合った source に変更する。'false' の場合はサイトアクセス時の source から変更しない。
 * @param shouldBackGroundLoadingOnPause 一時停止中にバックグラウンドで画像をロードするか？
 */
export const ScrollFlipBook = forwardRef<HTMLDivElement, Props>(
  function ScrollFlipBook(
    {
      defaultSource,
      sources,
      pause = false,
      preLoadingSize,
      canvasSize = { width: 1920, height: 1920 },
      background = 'transparent',
      positionFixed = false,
      animationStartPosition = 'window-top',
      animationEndPosition = 'window-top',
      onUpdateImage,
      onPreloadImages,
      ...rest
    },
    ref
  ) {
    const { width: initialWidth } = useWindowInitialSize();
    const { loadImage, preloadImage } = useImageLoader();

    const defaultSourceRef = useRef(defaultSource);
    const sourcesRef = useRef(sources);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastFrameIndexRef = useRef<number>(0);
    const maxLoadedFrameIndexRef = useRef<number>(0);

    const { fraction, isInside } = useWindowScrollInElement(wrapperRef, {
      scrollStartPosition: animationStartPosition,
      scrollEndPosition: animationEndPosition,
      waitingMs: 30,
      disableValueChangesOffscreen: true,
    });

    const currentFramePaths = useMemo(() => {
      return (
        sourcesRef.current.find((source) => source.breakPoint < initialWidth)
          ?.framePaths || defaultSourceRef.current.framePaths
      );
    }, [initialWidth]);

    const minBreakPoint = useMemo(
      () =>
        sources
          .map((source) => source.breakPoint)
          .reduce((a, b) => Math.max(a, b)),
      [sources]
    );

    // 画像の事前読み込み（大量に発火させるとパフォーマンスに影響が出るので debounce を利用）
    const preLoadImage = useMemo(
      () =>
        throttle(
          (
            start: number,
            targetFramePaths: {
              [encodeType in 'jpeg' | 'avif' | 'webp']?: string;
            }[]
          ) => {
            const end = preLoadingSize
              ? start + preLoadingSize
              : targetFramePaths.length;
            if (maxLoadedFrameIndexRef.current < targetFramePaths.length) {
              maxLoadedFrameIndexRef.current = end;
            } else {
              return;
            }
            const promises = targetFramePaths
              .slice(start, end)
              .map((path) => preloadImage(path));
            Promise.all(promises).then(() => {
              onPreloadImages?.();
              if (
                isInside &&
                maxLoadedFrameIndexRef.current < targetFramePaths.length
              ) {
                maxLoadedFrameIndexRef.current = targetFramePaths.length;
                const allPromises = targetFramePaths
                  .slice(end, targetFramePaths.length)
                  .map((path) => preloadImage(path));
                Promise.all(allPromises);
              }
            });
          },
          480
        ),
      [isInside, onPreloadImages, preLoadingSize, preloadImage]
    );

    const requestUpdateImage = useCallback(
      async (to: number) => {
        if (pause) {
          to = lastFrameIndexRef.current;
        }

        const img = await loadImage(currentFramePaths[to]);

        const canvas = canvasRef.current;
        if (!canvas || !img) {
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          return;
        }

        const { offset, size } = calcCoverRect(
          { width: canvas.clientWidth, height: canvas.clientHeight },
          { width: img.width, height: img.height }
        );

        const scale = calcCanvasScale(canvas);
        requestAnimationFrame(() => {
          context.drawImage(
            img,
            offset.left * scale.x,
            offset.top * scale.y,
            size.width * scale.x,
            size.height * scale.y
          );
        });

        if (onUpdateImage) {
          onUpdateImage({ index: to, progress: to / currentFramePaths.length });
        }

        lastFrameIndexRef.current = to;
      },
      [currentFramePaths, loadImage, onUpdateImage, pause]
    );

    const firstCalled = useRef(false);
    const effect = useCallback(() => {
      if (!isInside && firstCalled.current) {
        return;
      }
      firstCalled.current = true;
      const currentFramePathsIndex = Math.min(
        currentFramePaths.length - 1,
        Math.ceil(fraction.top * currentFramePaths.length)
      );
      if (currentFramePathsIndex === null) {
        return;
      }
      requestUpdateImage(currentFramePathsIndex);
      preLoadImage(currentFramePathsIndex, currentFramePaths);
    }, [
      currentFramePaths,
      fraction.top,
      isInside,
      preLoadImage,
      requestUpdateImage,
    ]);

    useEffect(
      () => preLoadImage(0, currentFramePaths),
      [preLoadImage, currentFramePaths]
    );
    useEffect(effect, [effect]);
    useWindowResizeEffect(effect, { waitingMs: 50 });

    const fitHeight = useCallback(() => {
      const container = containerRef.current;
      if (container) {
        // HACK: 100vhで高さ指定するとSlackなどのブラウザで見ると下に余白ができる。
        if (window.innerWidth < minBreakPoint) {
          container.style.height = `${window.outerHeight}px`;
        } else {
          container.style.height = '100vh';
        }
      }
    }, [minBreakPoint]);

    useEffect(fitHeight, [fitHeight]);
    useWindowResizeEffect(fitHeight, { waitingMs: 100 });

    return (
      <div
        {...rest}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
        ref={composeRefs(wrapperRef, ref)}
      >
        <div
          style={{
            position: `${positionFixed ? 'fixed' : 'sticky'}`,
            background,
            top: 0,
            right: 0,
            left: 0,
            display: 'flex',
            overflow: 'hidden',
            height: '100vh',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
          ref={containerRef}
        >
          <canvas
            {...canvasSize}
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={canvasRef}
          />
        </div>
      </div>
    );
  }
);
