import GridLayout from "react-grid-layout";
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import ChartComponent from "./Chart";


export function Grid() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 3, h: 5},
        { i: "b", x: 1, y: 0, w: 3, h: 2},
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={5}
            rowHeight={30}
            width={800}
        >
            <div style={{border: 'solid black 2px'}} key="a"><ChartComponent /></div>
        </GridLayout>
    );
}