import React, { useState } from 'react';
import NodesPanel from './components/NodesPanel';
import FlowBuilder from './components/FlowBuilder';
import SettingsPanel from './components/SettingsPanel';

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleNodeChange = (label) => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id ? { ...node, data: { ...node.data, label } } : node
        )
      );
      setSelectedNode((prevNode) => ({
        ...prevNode,
        data: { ...prevNode.data, label },
      }));
    }
  };

  const handleSave = () => {
    const invalidNodes = nodes.filter((node) => {
      const outgoingEdges = edges.filter((edge) => edge.source === node.id);
      return outgoingEdges.length === 0;
    });

    if (invalidNodes.length > 0) {
      alert('Each node must have at least one outgoing connection');
      return;
    }

    alert('Flow saved');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ddd' }}>
        {!selectedNode ? (
          <NodesPanel />
        ) : (
          <SettingsPanel selectedNode={selectedNode} onChange={handleNodeChange} />
        )}
      </div>
      <div style={{ width: '80%', position: 'relative' }}>
        <FlowBuilder
          onNodeSelect={handleNodeSelect}
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
        <button
          onClick={handleSave}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          Save Flow
        </button>
      </div>
    </div>
  );
};

export default App;
