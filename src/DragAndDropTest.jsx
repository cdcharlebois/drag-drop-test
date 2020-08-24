import { Component, createElement } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { hot } from "react-hot-loader/root";
import { Tree, TreeNode } from "react-organizational-chart";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/DragAndDropTest.css";

const DraggableItem = props => {
    const [, drag] = useDrag({
        item: { type: "node" },
        begin: props.onDrag.execute
    });
    const [, drop] = useDrop({
        accept: "node",
        drop: props.onDrop.execute
    });
    return (
        <div ref={drag}>
            <div ref={drop}>{props.children}</div>
        </div>
    );
};

const DragAndDropTest = props => {
    const _renderItem = item => {
        return item.children ? (
            <TreeNode
                label={
                    <DraggableItem onDrop={props.onDragEnd(item)} onDrag={props.onDragStart(item)}>
                        {props.content(item)}
                    </DraggableItem>
                }
            >
                {_renderChildrenTreeNodes(item.children)}
            </TreeNode>
        ) : (
            <TreeNode
                label={
                    <DraggableItem onDrop={props.onDragEnd(item)} onDrag={props.onDragStart(item)}>
                        {props.content(item)}
                    </DraggableItem>
                }
            />
        );
    };
    const _renderChildrenTreeNodes = children => {
        return children.map(item => _renderItem(item));
    };
    const _removeFromUniverse = (targets, universe) => {
        return universe.filter(u => {
            return !targets.find(t => {
                return t.id === u.id;
            });
        });
    };
    const _recursivelyBuildTree = (currentLevelArray, universe, parent, childkey) => {
        // find all the children of this parent
        currentLevelArray.forEach(item => {
            item.children = universe.filter(child => {
                return parent(child).value === childkey(item).value;
                // ... remove from universe
            });
            if (item.children) {
                universe = _removeFromUniverse(item.children, universe);
                if (universe.length > 0) {
                    _recursivelyBuildTree(item.children, universe, parent, childkey);
                }
            }
        });
    };
    const _renderTreeNodes = () => {
        const { datasource: ds, parent, childkey } = props;
        if (ds.status !== "available") return null;
        let universe = ds.items;
        // get the top level nodes
        let ret = ds.items.filter(item => {
            return parent(item).value === undefined;
        });
        // remove first level...
        universe = _removeFromUniverse(ret, universe);
        // for each top level node, recursively build the tree
        _recursivelyBuildTree(ret, universe, parent, childkey);
        // [{id: 1, children:[{id: 2}, {id: 3}]}]
        return ret.map(item => _renderItem(item));
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <Tree label={null}>{_renderTreeNodes()}</Tree>
        </DndProvider>
    );
};
export default hot(DragAndDropTest);
