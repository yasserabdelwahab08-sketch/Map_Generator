/*

Building{
    Map cereator : MapCereatorID
    floors:[{id,image}]
    ID:
    name:

    Nodes:[{
        id : 
        name :
        adcjacncy list: [ {node,weight} ];
        X:
        Y:
        floorID:
        }]
        
        
        }
*/
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    push(node, priority) {
        this.heap.push({ node, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp(index) {
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) swap = leftChildIndex;
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

function dijkstra(graphMap, build, startNodeId, endNodeId) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const path = [];

    for (let i = 0; i < build.Nodes.length; i++) {
        let nodeData = build.Nodes[i];
        distances[nodeData.id] = (nodeData.id === startNodeId) ? 0 : Infinity;
        previous[nodeData.id] = null;
    }



    pq.push(startNodeId, 0);

    while (!pq.isEmpty()) {
        let current = pq.pop();
        let smallest = current.node;
        let currentPriority = current.priority;

        if (currentPriority > distances[smallest]) {
            continue;
        }

        if (smallest === endNodeId) {
            let curr = smallest;
            while (previous[curr] !== null) {
                path.push(curr);
                curr = previous[curr];
            }
            break;
        }

        if (smallest && distances[smallest] !== Infinity) {
            let neighbors = graphMap[smallest].adjacency_list;

            for (let i = 0; i < neighbors.length; i++) {
                let nextNode = neighbors[i];
                let candidate = distances[smallest] + nextNode.weight;
                let nextNeighbor = nextNode.node;

                if (candidate < distances[nextNeighbor]) {
                    distances[nextNeighbor] = candidate;
                    previous[nextNeighbor] = smallest;
                    pq.push(nextNeighbor, candidate);
                }
            }
        }
    }

    const hasPath = distances[endNodeId] !== Infinity;

    return {
        distances,
        path: hasPath ? path.concat(startNodeId).reverse() : null
    };
}


function handleJSON(start, end, build) {
    let ret = [];
    /*
    output is the distance from start to end, an array of the ID of the floors to be visited and (ret) which is a 2d array.
    each row of the 2d array are the points of the path that should be highlighted and connected
     on the image of a single floor.
    Note:
    **if end is unreachable from start node then the output is an empty array**
    
    exmple output:
    
    {distance,
     [floorID],
        [
        [{x:1,y:5},{x:7,y:8}],
        [{x:3,y:9},{x:9,y:2}],
        [{x:4,y:2},{x:7,y:8}]
        ]

    }

    */

    const graphMap = {};

    for (let i = 0; i < build.Nodes.length; i++) {
        let nodeData = build.Nodes[i];
        graphMap[nodeData.id] = nodeData;
    }

    if (!graphMap[start] || !graphMap[end]) {
        //check if the nodes ids do not exist then return an empty answer
        return { val1: Infinity, floorsArray: [], ret: [] };
    }

    const dij = dijkstra(graphMap, build, start, end);

    let curFloor = graphMap[start].floorID;
    let floorsArray = [curFloor];
    let curArray = [];
    if (dij.distances[end] == Infinity) {
        // end is unreachable
        let val1 = dij.distances[end];
        return { val1, floorsArray, ret };
    }
    for (let i = 0; i < dij.path.length; i++) {
        let node = dij.path[i];
        if (graphMap[node].floorID == curFloor) {
            curArray.push({ x: graphMap[node].X, y: graphMap[node].Y });
        } else {
            ret.push(curArray);
            curArray = [];
            curArray.push({ x: graphMap[node].X, y: graphMap[node].Y });
            curFloor = graphMap[node].floorID;
            floorsArray.push(curFloor);
        }
    }
    if (curArray.length > 0) {
        ret.push(curArray);
    }
    let val1 = dij.distances[end];
    return { val1, floorsArray, ret };
}