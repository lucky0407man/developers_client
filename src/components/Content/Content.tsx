import React from "react";

interface ContentProps {
  selectedItem: string;
}

const Content: React.FC<ContentProps> = ({ selectedItem }) => {
  return (
    <aside
      style={{
        flex: 1,
        height: '100%',
        overflowY: "auto",
        backgroundColor: '#fff',
      }}
      >
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>{selectedItem}</h1>
        <p>Content for {selectedItem} goes here...
          Another way is to change the percentage of the flex 
          property of the flex items to create different layouts for d
          ifferent screen sizes. Note that we also have to include flex-wrap:
           wrap; on the flex container for this example to work:
        </p>
      </div>
    </aside>
  );
};

export default Content;