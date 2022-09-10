import { GetStaticProps } from 'next';

import { Top } from '../components/pages/Top';
import type { TopProps } from '../components/pages/Top';
import { getFramePaths } from '../utils/getFramePaths';
import { assets } from '../utils/url';

export const getStaticProps: GetStaticProps<TopProps> = () => {
  const framePaths = getFramePaths(
    assets('first_view_pc'),
    1,
    162,
    {
      avif: true,
      webp: true,
      jpg: true,
    },
    {
      padLength: 3,
    }
  );
  console.log(framePaths);
  return {
    props: {
      framePaths: framePaths,
    },
  };
};

export default Top;
