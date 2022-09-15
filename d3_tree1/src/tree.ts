import * as d3 from 'd3';

const getNodeWidth = (node: any) => {
  return (node.id || '').length * 9
}

export default function Tree(data: any, { // data is either tabular (array of objects) or hierarchy (nested objects)
  path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
  id = Array.isArray(data) ? (d: { id: any; }) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
  parentId = Array.isArray(data) ? (d: { parentId: any; }) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
  children, // if hierarchical data, given a d in data, returns its children
  tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
  sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
  label, // given a node d, returns the display name
  title, // given a node d, returns its hover text
  link, // given a node d, its link (if any)
  linkTarget = "_blank", // the target attribute for links (if any)
  width = 640, // outer width, in pixels
  height, // outer height, in pixels
  r = 3, // radius of nodes
  padding = 1.5, // horizontal padding for first and last column
  fill = "#999", // fill for nodes
  fillOpacity, // fill opacity for nodes
  stroke = "#555", // stroke for links
  strokeWidth = 1.5, // stroke width for links
  strokeOpacity = 0.4, // stroke opacity for links
  strokeLinejoin, // stroke line join for links
  strokeLinecap, // stroke line cap for links
  halo = "#fff", // color of label halo 
  haloWidth = 3, // padding around the labels
} = {} as any) {

  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  // const root = path != null ? d3.stratify().path(path)(data)
  //     : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
  //     : d3.hierarchy(data, children);

  // // Sort the nodes.
  // if (sort != null) root.sort(sort);
  const root = d3.stratify()
    .id(function(d: any) {  return d.target  })
    .parentId(function(d: any) {  return d.source || null  })
    (data);

  // Compute labels and titles.
  const descendants = root.descendants();
  const L = label == null ? null : descendants.map((d: { data: any; }) => label(d.data, d));

  // Compute the layout.
  const dx = 110;
  const dy = width / (root.height + padding);
  tree().nodeSize([dx, dy])(root);

  // Center the tree.
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d: { x: number; }) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the default height.
  if (height === undefined) height = x1 - x0 + dx * 2;

  const svg = d3.create("svg")
      .attr("viewBox", [0, x0 - dx, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

      // 处理 links
  const links = root.links().map(({ source, target }: any) => {
    return {
      source: {
        x: source.x,
        y: source.y + getNodeWidth(source),
      },
      target: {
        x: target.x,
        y: target.y
      }
    }
  })

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
    .selectAll("path")
      .data(links)
      .join("path")
        .attr("d", d3.linkHorizontal()
            .x((d: { y: any; }) => d.y)
            .y((d: { x: any; }) => d.x));

  const node = svg.append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
      .attr("xlink:href", link == null ? null : (d: { data: any; }) => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", (d: { y: any; x: any; }) => `translate(${d.y},${d.x})`);

  node.append("rect")
      .attr("height", "30px") 
      .attr("width", (d: any) => { return `${ getNodeWidth(d) }px` } )
      .attr("transform", (d:any) => `translate(0, -15)`)
      .attr("fill", (d: { children: any; }) => d.children ? stroke : fill)
  
  // node.append("text")
  // .text

  if (title != null) node.append("title")
      .text((d: { data: any; }) => title(d.data, d));

  node.append("text")
      .attr("dy", "0.32em")
      .attr("x", (d: any) => getNodeWidth(d) / 2 )
      .attr("text-anchor", 'middle')
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d: any, i: string | number) => { return d.id });

  return svg.node();
}