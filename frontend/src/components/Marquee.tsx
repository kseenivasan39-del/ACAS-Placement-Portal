import React from 'react';

export default function Marquee({ children, scrollamount, ...props }: any) {
  return React.createElement(
    'marquee',
    { scrollamount, ...props },
    children
  );
}
