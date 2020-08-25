import { Component, createElement } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { hot } from "react-hot-loader/root";

import "./ui/DragAndDropTest.css";
import { OrgChart } from "./components/OrgChart";

const DragAndDropTest = props => {
    const { onDragEnd, onDragStart, content } = props;
    const { parent, childkey: key } = props;
    const { datasource: ds } = props;
    /**
     * removes any found items from the universe so they are not checked again.
     * @param {[ds item]} targets - the ds items that we want to remove from the unviverse
     * @param {[ds item]} universe - the current universe
     *
     */
    const _removeFromUniverse = (targets, universe) => {
        return universe.filter(u => {
            return !targets.find(t => {
                return t.id === u.id;
            });
        });
    };
    /**
     * for each item in `currentLevelArray`, find and attach children from `universe`, recursively
     * @param {[ds item]} currentLevelArray - set of siblings
     * @param {[ds item]} universe - unattached set of ds items
     */
    const _recursivelyBuildTree = (currentLevelArray, universe) => {
        // find all the children of this parent
        currentLevelArray.forEach(item => {
            item.children = universe.filter(child => {
                return parent(child).value === key(item).value;
                // ... remove from universe
            });
            if (item.children) {
                universe = _removeFromUniverse(item.children, universe);
                if (universe.length > 0) {
                    _recursivelyBuildTree(item.children, universe);
                }
            }
        });
    };
    /**
     * Identify the top level nodes (those without parents), and begin building the tree
     * @param {mx:datasource} data - the datasource from mendix
     * @returns {[tree structure]} - the converted tree structure ([{id: 1, children:[{id: 2}, {id: 3}]}])
     */
    const _getDataMap = data => {
        if (!data) return null;
        let universe = data;
        // get the top level nodes
        let ret = data.filter(item => {
            return parent(item).value === undefined;
        });
        // remove first level...
        universe = _removeFromUniverse(ret, universe);
        // for each top level node, recursively build the tree
        _recursivelyBuildTree(ret, universe);
        return ret;
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <OrgChart data={_getDataMap(ds.items)} onDrop={onDragEnd} onDrag={onDragStart} node={content} />
        </DndProvider>
    );
};
export default hot(DragAndDropTest);
