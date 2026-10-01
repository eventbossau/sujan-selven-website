'use client';
import React from 'react';
export function ArticleBody({ children, className = '', ...rest }) {
  return <div className={'ss-prose ' + className} {...rest}>{children}</div>;
}
