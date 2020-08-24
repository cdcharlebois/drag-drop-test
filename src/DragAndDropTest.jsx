import { Component, createElement } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import { hot } from "react-hot-loader/root";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/DragAndDropTest.css";

const DraggableItem = props => {
    return (
        <Draggable type="node" onMouseDown={props.onDrag.execute}>
            <Droppable types={["node"]} onDrop={props.onDrop.execute}>
                {props.children}
            </Droppable>
        </Draggable>
    );
};

const DragAndDropTest = props => {
    const _renderItems = () => {
        return props.datasource.status === "available"
            ? props.datasource.items.map(item => (
                  <DraggableItem onDrop={props.onDragEnd(item)} onDrag={props.onDragStart(item)}>
                      {props.content(item)}
                  </DraggableItem>
              ))
            : null;
    };
    return _renderItems();
};

// class DragAndDropTest extends Component {

//     render() {
//         const { datasource: ds } = this.props;

//     }
// }

export default hot(DragAndDropTest);
