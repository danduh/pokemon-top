const data = [
    {id:200, name: 'A', parent:300},
    {id:300, name: 'B', parent:null},
    {id:400, name:'C', parent:300},
    {id:500, name:'D', parent:700},
    {id:600, name:'E', parent:700},
    {id:700, name:'F', parent:null},
    {id:800, name:'H', parent:null},
    {id:900, name:'Grand', parent:200}
]

function setTrees(data) {
    const trees = [];
    const map = {};

    data.forEach(item => {
        map[item.id] = { ...item, children: [] };
    });

    data.forEach(item => {
        if (item.parent === null) {
            trees.push(map[item.id]); 
        } else {
           if (map[item.parent]) {
                map[item.parent].children.push(map[item.id]);
            }
        }
    });

    return trees;
}

function printTree(nodes, indent = '-') {
    nodes.forEach(node => {
        console.log(indent + node.name);
        if (node.children.length > 0) {
            printTree(node.children, indent + '-');
        }
    });
}

const trees = setTrees(data);
printTree(trees);