import { Component, createElement } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { hot } from "react-hot-loader/root";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/DragAndDropTest.css";

const DraggableItem = props => {
    const [, drag] = useDrag({
        //[props, ref] // props is likely not needed
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
    const _renderItems = () => {
        return props.datasource.status === "available"
            ? props.datasource.items.map(item => (
                  <DraggableItem onDrop={props.onDragEnd(item)} onDrag={props.onDragStart(item)}>
                      {props.content(item)}
                  </DraggableItem>
              ))
            : null;
    };
    return <DndProvider backend={HTML5Backend}>{_renderItems()}</DndProvider>;
};

// class DragAndDropTest extends Component {

//     render() {
//         const { datasource: ds } = this.props;

//     }
// }

export default hot(DragAndDropTest);
