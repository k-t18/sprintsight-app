"use client";

import { useState } from "react";

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

const DATA: TreeNode = {
  id: "1",
  label: "Marketing",
  children: [
    { id: "2", label: "Paper Advertising" },
    { id: "3", label: "Email Campaign" },
    {
      id: "4",
      label: "Corporate Web Site",
      children: [
        { id: "5", label: "Document" },
        {
          id: "6",
          label: "Design",
          children: [
            { id: "7", label: "Analyze needs" },
            { id: "8", label: "Analyze tasks" },
            { id: "9", label: "Analyze audience" },
          ],
        },
      ],
    },
  ],
};

function TreeNodeComponent({
  node,
  depth,
  parentExpanded,
}: {
  node: TreeNode;
  depth: number;
  parentExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const showChildren = parentExpanded && expanded && hasChildren;

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      {depth > 0 && (
        <div className="w-px h-4 bg-sky-300 flex-shrink-0" aria-hidden />
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="bg-sky-200 border border-sky-400 rounded-lg px-4 py-2 text-white font-medium text-center min-w-[120px] shadow-sm">
            {node.label}
          </div>
          {hasChildren && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="mt-1 w-5 h-5 rounded border border-sky-400 bg-sky-200 text-sky-700 flex items-center justify-center text-sm font-bold hover:bg-sky-300 transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? "−" : "+"}
            </button>
          )}
        </div>
        {showChildren && (
          <>
            <div className="w-px h-4 bg-sky-300 flex-shrink-0" aria-hidden />
            <div className="flex gap-8 pt-2 relative">
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 h-px bg-sky-300"
                  style={{
                    left: "50%",
                    width: "calc(100% - 2rem)",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
              {node.children!.map((child) => (
                <TreeNodeComponent
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  parentExpanded={showChildren}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Prototype2Page() {
  return (
    <div className="min-h-screen bg-slate-100 p-8 flex justify-center items-start">
      <TreeNodeComponent
        node={DATA}
        depth={0}
        parentExpanded={true}
      />
    </div>
  );
}
