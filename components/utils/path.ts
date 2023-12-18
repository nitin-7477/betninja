import { parse } from "react-native-redash";

export const getPathXCenter = (currentPath: String) => {
  const curves = parse(currentPath).curves;
  const startPoint = curves[0].to;
  const endpoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endpoint.x) / 2;
  return centerX;
};

export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
  const curves = tabPaths[index].curves;
  const startPoint = curves[0].to;
  const endpoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endpoint.x) / 2;
  return centerX;
};
