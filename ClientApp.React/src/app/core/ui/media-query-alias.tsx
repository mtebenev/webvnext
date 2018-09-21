import * as React from 'react';
import MediaQuery from 'react-responsive';

// Aliases are from angular flex-layout. Check breakpoint details at
// https://github.com/angular/flex-layout/wiki/Responsive-API
export const MediaQueryLtSm = (props: any) => <MediaQuery {...props} query="screen and (max-width: 599px)" />;
export const MediaQueryLtMd = (props: any) => <MediaQuery {...props} query="screen and (max-width: 959px)" />;
export const MediaQueryGtSm = (props: any) => <MediaQuery {...props} query="screen and (min-width: 960px)" />;
export const MediaQueryGtMd = (props: any) => <MediaQuery {...props} query="screen and (min-width: 1280px)" />;
export const MediaQueryGtLg = (props: any) => <MediaQuery {...props} query="screen and (min-width: 1920px)" />;
