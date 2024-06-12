import React from 'react';

const SettingsPanel = ({ selectedNode, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <aside style={{ padding: '10px', borderLeft: '1px solid #ddd' }}>
      {selectedNode && (
        <div>
          <label>Text:</label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={handleInputChange}
          />
        </div>
      )}
    </aside>
  );
};

export default SettingsPanel;
