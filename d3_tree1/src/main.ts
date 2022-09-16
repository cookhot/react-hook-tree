import Tree from './tree';

export default (data: any, width = 1000, height = 600) => {
  const svg = Tree(data, {
    width,
    height
  }) as any;

  document.body.appendChild(svg);
}