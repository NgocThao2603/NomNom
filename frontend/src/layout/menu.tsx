export type TTargetLink = '_blank' | '_parent' | '_self' | '_top' | undefined;
export type TMenu = {
  title: string;
  url: string;
  target: TTargetLink;
  children: {
    title: string;
    url: string;
    target: TTargetLink;
  }[];
}[];

export const menu: TMenu = [];
