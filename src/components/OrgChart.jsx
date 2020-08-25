import { Component, createElement } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { DraggableItem } from "./DraggableItem";

export const OrgChart = props => {
    const { onDrag, onDrop, node, data } = props;
    const _renderTreeNodes = map => {
        return map != null ? map.map(item => _renderItem(item)) : null;
    };
    const _renderChildrenTreeNodes = children => {
        return children.map(item => _renderItem(item));
    };
    const _renderItem = item => {
        return item.children ? (
            <TreeNode
                label={
                    <DraggableItem onDrop={onDrop(item)} onDrag={onDrag(item)}>
                        {node(item)}
                    </DraggableItem>
                }
            >
                {_renderChildrenTreeNodes(item.children)}
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
    return <Tree label={null}>{_renderTreeNodes(data)}</Tree>;
};
