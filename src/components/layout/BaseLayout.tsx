import React from 'react';

interface IProps {
  children: React.ReactNode;
}
function BaseLayout({ children }: IProps) {
  return children;
}

export default BaseLayout;
