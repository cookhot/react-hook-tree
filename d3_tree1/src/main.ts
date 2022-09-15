import * as d3 from 'd3';

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

const root = d3.stratify()
    .id(function(d: any) {  return d.target  })
    .parentId(function(d: any) {  return d.source || null  })
    (data);

const tree = d3.tree();

// tree(root).each((node) => {
//   console.log(node);
// })

const svg = d3.create("svg")
      .attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
    .selectAll("path")
      .data(root.links())
      .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

  const node = svg.append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
      .attr("xlink:href", link == null ? null : d => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? stroke : fill)
      .attr("r", r);

  if (title != null) node.append("title")
      .text(d => title(d.data, d));

  if (L) node.append("text")
      .attr("dy", "0.32em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);




// d3.tree()(root);




// 生成好节点
console.log(root);


// console.log(d3);