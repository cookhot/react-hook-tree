import { HierarchyNode, HierarchyPointNode } from 'd3-hierarchy'
import { Rect } from '../config'

export interface TNode {
    id: string;
    parentId: string;
}


export interface HierarchyPointAndRectNode<T> extends HierarchyPointNode<T> {
    rect?: Rect
}