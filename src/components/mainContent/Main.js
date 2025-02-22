import React, {  useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { BiRightArrow } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Card from "../atoms/Card";
import data from "../data.json";

const generateGraphElements = (
  data,
  parentId = null,
  elements = { nodes: [], edges: [] },
  position = { x: 0, y: 0 },
  idCounter = { current: 0 }
) => {
  const id = `node-${idCounter.current++}`;
  const nodeId = id;

  const nodePosition = {
    x: position.x,
    y: position.y,
  };

  elements.nodes.push({
    id: nodeId,
    position: nodePosition,
    type: "textUpdater",
    data: {
      label: data,
    },
    sourcePosition: "right",
    targetPosition: "left",
  });

  if (parentId) {
    elements.edges.push({
      id: `edge-${parentId}-${nodeId}`,
      source: parentId,
      type: "step",
      target: nodeId,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
      label: "",
      sourcePosition: "right",
      targetPosition: "left",
    });
  }

  const numChildren = data.children.length;
  const numChildrenAbove = Math.floor(numChildren / 2);
  const numChildrenBelow = Math.ceil(numChildren / 2);

  let childXPosition = nodePosition.x + 400;
  let childYPositionAbove = nodePosition.y - numChildrenAbove * 110;
  let childYPositionBelow = nodePosition.y + numChildrenBelow * 110;
  data.children.forEach((child, index) => {
    const childYPosition =
      index < numChildrenAbove ? childYPositionAbove : childYPositionBelow;
    generateGraphElements(
      child,
      nodeId,
      elements,
      { x: childXPosition, y: childYPosition },
      idCounter
    );
    index < numChildrenAbove
      ? (childYPositionAbove += 220)
      : (childYPositionBelow += 220);
  });

  return elements;
};

const graphElements = generateGraphElements(data[0]);
const defaultNodes = graphElements.nodes;
const defaultEdges = graphElements.edges;

const Main = () => {
  const nodeTypes = useMemo(() => ({ textUpdater: Card }), []);
  return (
    <div className="w-full h-[94.7vh] bg-[#181E25]">
      <div className="flex-1 w-full h-[94%]">
        <ReactFlow
          defaultNodes={defaultNodes}
          defaultEdges={defaultEdges}
          nodeTypes={nodeTypes}
        >
          <Background
            color="#808080"
            gap={100}
            lineWidth="0.5"
            variant={BackgroundVariant.Lines}
          />
        </ReactFlow>
        <button className=" absolute left-[95px] bg-[#F27400] text-white font-medium text-sm px-1.5 py-2.5 rounded z-10 bottom-[75px] flex items-center justify-between">
          <IoMdAdd /> Add methods
        </button>
      </div>
      <div className="p-4 mt-1 border-t z-10 h-[5.5%] w-full border-[#505050] flex justify-start items-center bg-[#363636]">
        <span className="text-[#bdbdbd] flex items-center font-medium text-base">
          cart <BiRightArrow className="mt-1 mx-1 w-[12px] h-[12px]" />{" "}
          cart_routes.py{" "}
          <BiRightArrow className="mt-1 mx-1 w-[12px] h-[12px]" /> POST /carts/
          {"{cart_id}"}
        </span>
      </div>
    </div>
  );
};

export default Main;
