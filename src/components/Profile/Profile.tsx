import React, { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

const Profile = () => {
    const [selectedItem, setSelectedItem] = useState("Thomas");
    const items = ["Thomas", "Alice", "Davie", "Faythy", "Graco", "Walt", "Xavi"
                , "Bob", "Eve", "Charlie", "David", "Faythe", "Grace", "Heidi"
                , "Ingrid", "Judy", "Mallory", "Niaj", "Olivia", "Peggy", "Sylvia"
                , "Trent", "Victor", "Walter", "Xavier", "Yvonne", "Zara"];
    return (
        <div style={{ flex: 1, display: "flex", height: "100%" }}>
            <Sidebar
            items={items}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            />
            <Content selectedItem={selectedItem} />
        </div>
    );
};

export default Profile;
