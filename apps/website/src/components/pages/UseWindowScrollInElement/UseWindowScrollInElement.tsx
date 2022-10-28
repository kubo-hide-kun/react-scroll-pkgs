import React from 'react';

import { Demo3D } from '../Top/internal/Demo3D';

export const UseWindowScrollInElement = () => {
  return (
    <div>
      <h1>useWindowScrollInElement</h1>
      <p>
        ターゲット要素からウィンドウがどれだけスクロールしたかを取得するフックです。
      </p>
      {new Array(20).fill(0).map((_, idx) => (
        <p key={idx}>hogehoge</p>
      ))}
      <Demo3D />
      {new Array(20).fill(0).map((_, idx) => (
        <p key={idx}>hogehoge</p>
      ))}
    </div>
  );
};
