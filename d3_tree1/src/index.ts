import * as d3 from 'd3';
import Tree from './tree';

const data = [
  {
    'source': "",
    'source_level': 0,
    'target': 'holdout',
    'target_level': 0
  },
  {
    'source': "holdout",
    'source_level': 0,
    'target': '无电商感直播屏蔽holdout',
    'target_level': 1.0
  },
  {
    'source': "holdout",
    'source_level': 0,
    'target': '1月app总combo实验',
    'target_level': 1.0
  },
  {
    'source': '无电商感直播屏蔽holdout',
    'source_level': 1.5,
    'target': '电商7pp-电商live头像&挂车短视频 holdout实验',
    'target_level': 2.0
  },
  {
    'source': '无电商感直播屏蔽holdout',
    'source_level': 1.5,
    'target': '公域电商直播+内流上下滑22年holdout实验',
    'target_level': 2.0
  },
  {
    'source': '1月app总combo实验',
    'source_level': 1.0,
    'target': '电商直播+短视频流量栅栏长期屏蔽holdout',
    'target_level': 1.0
  },
  { 'source': '电商直播+短视频流量栅栏长期屏蔽holdout',
    'source_level': 1.0,
    'target': '公域无直播场景屏蔽holdout',
    'target_level': 1.5
  },
  {
    'source': '公域无直播场景屏蔽holdout',
  'source_level': 1.5,
  'target': '公域电商直播+内流上下滑22年holdout实验',
  'target_level': 2.0
  },
]

const svg = Tree(data);

document.body.appendChild(svg);

// console.log(body, svg);
