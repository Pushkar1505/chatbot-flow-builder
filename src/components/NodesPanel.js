import React from 'react';

const NodesPanel = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: '10px', borderRight: '1px solid #ddd' }}>
      <div
        className="dndnode"
        onDragStart={(event) => handleDragStart(event, 'text')}
        draggable
        style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '3px', background: 'white', marginBottom: '10px', cursor: 'pointer' }}
      >
        Text Node
      </div>
    </aside>
  );
};

export default NodesPanel;
