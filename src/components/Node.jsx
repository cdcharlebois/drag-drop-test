import { Component, createElement, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { DraggableItem } from "./DraggableItem";

export const Node = props => {
    const { onDrag, onDrop, node, item, toggleOpen, isOpen } = props;
    const [showChildren, setShowChildren] = useState(isOpen(item));
    const handleToggleOpen = () => {
        toggleOpen(item);
        setShowChildren(!showChildren);
    };
    const _renderChildrenTreeNodes = children => {
        return children.map(item => (
            <Node onDrag={onDrag} onDrop={onDrop} node={node} item={item} toggleOpen={toggleOpen} isOpen={isOpen} />
        ));
    };
    const hasChildren = item.children && item.children.length > 0;
    return hasChildren ? (
        <TreeNode
            label={
                <div>
                    <DraggableItem onDrop={onDrop(item)} onDrag={onDrag(item)}>
                        {node(item)}
                    </DraggableItem>
                    {/* <div onClick={() => toggleOpen(item)}>{isOpen(item) ? `-` : `+`}</div> */}
                    <div onClick={handleToggleOpen}>{showChildren ? `-` : `+`}</div>
                </div>
            }
        >
            {/* {isOpen(item) ? _renderChildrenTreeNodes(item.children) : null} */}
            {showChildren ? _renderChildrenTreeNodes(item.children) : null}
        </TreeNode>
    ) : (
        <TreeNode
            label={
                <DraggableItem onDrop={onDrop(item)} onDrag={onDrag(item)}>
                    {node(item)}
                </DraggableItem>
            }
        />
    );
};
