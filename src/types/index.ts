import * as React from 'react'
import { HierarchyNode, HierarchyPointNode } from 'd3-hierarchy'

export interface Margin {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface TNode {
    id: string;
    parentId: string;
}

export interface IBoxProps extends React.SVGProps<SVGElement> {
    margin?: Margin;
}

export interface HierarchyRectNode<Datum> extends HierarchyNode<Datum> {
    rect?: SVGRect
}

export interface HierarchyPointAndRectNode<Datum> extends HierarchyPointNode<Datum> {
    rect?: SVGRect
}

export interface IRenderNode<Datum> {
    (data: HierarchyPointNode<Datum>): React.ReactElement
}

export interface IRenderLine<Datum> {
    (source: HierarchyPointNode<Datum>, target: HierarchyPointNode<Datum>): React.ReactElement
}

export interface IRenderHierarchNodeWithRect {
    <Datum>(root: HierarchyNode<Datum>, renderNode: IRenderNode<Datum>): Promise<HierarchyRectNode<Datum>>
}
