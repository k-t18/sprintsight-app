declare module "@dabeng/react-orgchart" {
  import { RefObject } from "react";

  interface OrgChartNode {
    id: string;
    name: string;
    children?: OrgChartNode[];
    [key: string]: any;
  }

  interface OrgChartProps {
    ref?: RefObject<OrgChartInstance>;
    datasource: OrgChartNode;
    collapsible?: boolean;
    pan?: boolean;
    zoom?: boolean;
    zoominLimit?: number;
    zoomoutLimit?: number;
    chartClass?: string;
    containerClass?: string;
    NodeTemplate?: React.ComponentType<any>;
    onClickChart?: (e: any) => void;
    onClickNode?: (node: OrgChartNode) => void;
    draggable?: boolean;
    multipleSelect?: boolean;
  }

  interface OrgChartInstance {
    expandAllNodes: () => void;
    exportTo: (filename: string, fileextension: string) => void;
  }

  const OrgChart: React.ForwardRefExoticComponent<
    OrgChartProps & React.RefAttributes<OrgChartInstance>
  >;

  export default OrgChart;
}
