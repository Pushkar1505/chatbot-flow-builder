import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  Handle,
} from 'react-flow-renderer';

const nodeTypes = {
  text: ({ data }) => (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '3px', background: 'white' }}>
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  )
};

const FlowBuilder = ({ onNodeSelect, nodes, setNodes, edges, setEdges }) => {
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => nds.map((node) => (node.id === changes[0].id ? { ...node, ...changes[0] } : node))),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => eds.map((edge) => (edge.id === changes[0].id ? { ...edge, ...changes[0] } : edge))),
    [setEdges]
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: (new Date()).toISOString(),
      type,
      position,
      data: { label: 'New Node' },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '100%', width: '100%' }} onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => onNodeSelect(node)}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
