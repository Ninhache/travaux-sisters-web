import { ReactNode } from "react";

export type LayoutProps<T = {}> = {
  children?: ReactNode;
} & T;

export type ParamsProps<P = Record<string, unknown>> = {
  params: Promise<P>;
};

export type ParametizedLayoutProps<
  T = {},
  P = Record<string, unknown>,
> = LayoutProps<T> & ParamsProps<P>;
