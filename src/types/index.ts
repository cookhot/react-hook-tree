import * as React from 'react'
import { HierarchyNode } from 'd3-hierarchy'

import { HierarchyPointNode } from 'd3-hierarchy'
export interface TNode {
    id: string;
    parentId: string;
}

export interface HierarchyRectNode<Datum> extends HierarchyNode<Datum> {
    rect?: SVGRect
}

export interface HierarchyPointAndRectNode<Datum> extends HierarchyPointNode<Datum> {
    rect?: SVGRect
}

export interface IRenderNode<Datum> {
    (data: Datum): React.ReactElement
}

export interface IRenderLine<Datum> {
    (source: Datum, target: Datum): React.ReactSVGElement
}

export interface IRenderHierarchWithRect<Datum> {
    (root: HierarchyNode<Datum>, renderNode: IRenderNode<Datum>): Promise<HierarchyRectNode<Datum>>
}
