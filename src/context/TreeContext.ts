import * as React from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import { TNode } from '../types/index'

export default React.createContext<HierarchyNode<TNode>>(null)