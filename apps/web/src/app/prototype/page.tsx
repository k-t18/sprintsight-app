"use client";

import { useRef } from "react";
import OrgChart from "@dabeng/react-orgchart";

// Custom Node Template for Developers
const DeveloperNode = ({ nodeData }: { nodeData: any }) => {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-emerald-500 text-white rounded-xl shadow-lg border-2 border-primary-600 min-w-[160px] p-4 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <div className="font-bold text-lg">{nodeData.name}</div>
      </div>
      {nodeData.title && (
        <div className="text-xs opacity-90 font-medium bg-white/20 rounded px-2 py-1 inline-block">
          {nodeData.title}
        </div>
      )}
    </div>
  );
};

// Custom Node Template for Projects
const ProjectNode = ({ nodeData }: { nodeData: any }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-lg border-2 border-purple-600 min-w-[140px] p-4 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        <div className="font-bold text-lg">{nodeData.name}</div>
      </div>
      {nodeData.title && (
        <div className="text-xs opacity-90 font-medium bg-white/20 rounded px-2 py-1">
          {nodeData.title}
        </div>
      )}
    </div>
  );
};

// Custom Node Template for Sprints
const SprintNode = ({ nodeData }: { nodeData: any }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg border-2 border-blue-600 min-w-[140px] p-4 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <div className="font-bold text-lg">{nodeData.name}</div>
      </div>
      {nodeData.title && (
        <div className="text-xs opacity-90 font-medium bg-white/20 rounded px-2 py-1">
          {nodeData.title}
        </div>
      )}
    </div>
  );
};

// Custom Node Template for Tasks
const TaskNode = ({ nodeData }: { nodeData: any }) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg shadow-md border-2 border-amber-600 min-w-[120px] p-3 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <div className="font-semibold text-sm">{nodeData.name}</div>
      </div>
      {nodeData.title && (
        <div className="text-xs opacity-90 bg-white/20 rounded px-2 py-0.5">
          {nodeData.title}
        </div>
      )}
    </div>
  );
};

// Custom Node Template for Root/Team
const TeamNode = ({ nodeData }: { nodeData: any }) => {
  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 text-white rounded-xl shadow-xl border-2 border-dark-700 min-w-[180px] p-5">
      <div className="flex items-center gap-3 mb-2">
        <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        <div className="font-bold text-xl">{nodeData.name}</div>
      </div>
      <div className="text-sm text-dark-300 font-medium">Sprint Team</div>
    </div>
  );
};

// Determine which template to use based on node type
const CustomNodeTemplate = ({ nodeData }: { nodeData: any }) => {
  if (nodeData.id === "team") {
    return <TeamNode nodeData={nodeData} />;
  }
  if (nodeData.type === "project" || nodeData.name?.toLowerCase().includes("project")) {
    return <ProjectNode nodeData={nodeData} />;
  }
  if (nodeData.type === "sprint" || nodeData.name?.toLowerCase().includes("sprint")) {
    return <SprintNode nodeData={nodeData} />;
  }
  if (nodeData.type === "task" || nodeData.name?.toLowerCase().includes("task")) {
    return <TaskNode nodeData={nodeData} />;
  }
  return <DeveloperNode nodeData={nodeData} />;
};

export default function PrototypePage() {
  const orgChartRef = useRef<any>(null);

  // Enhanced data structure: Team -> Developers -> Projects -> Sprints -> Tasks
  const chartData = {
    id: "team",
    name: "Development Team",
    children: [
      {
        id: "dev1",
        name: "Rohit Geddam",
        title: "Frontend Developer",
        children: [
          {
            id: "proj1",
            name: "Web Platform",
            type: "project",
            title: "Main Web Application",
            children: [
              {
                id: "sprint1",
                name: "Sprint 1",
                type: "sprint",
                title: "Q1 2024",
                children: [
                  { id: "task1", name: "Task: Login UI", type: "task", title: "High Priority" },
                  { id: "task2", name: "Task: Dashboard", type: "task", title: "Medium Priority" },
                ],
              },
              {
                id: "sprint2",
                name: "Sprint 2",
                type: "sprint",
                title: "Q1 2024",
                children: [
                  { id: "task3", name: "Task: Profile Page", type: "task", title: "High Priority" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "dev2",
        name: "Amir Rai",
        title: "Full Stack Developer",
        children: [
          {
            id: "proj2",
            name: "API Services",
            type: "project",
            title: "Backend Services",
            children: [
              {
                id: "sprint3",
                name: "Sprint 1",
                type: "sprint",
                title: "Q1 2024",
                children: [
                  { id: "task4", name: "Task: Auth API", type: "task", title: "Critical" },
                  { id: "task5", name: "Task: User API", type: "task", title: "High Priority" },
                  { id: "task6", name: "Task: Data Sync", type: "task", title: "Medium Priority" },
                  ],
              },
            ],
          },
          {
            id: "proj3",
            name: "Mobile App",
            type: "project",
            title: "iOS & Android",
            children: [
              {
                id: "sprint4",
                name: "Sprint 1",
                type: "sprint",
                title: "Q1 2024",
                children: [
                  { id: "task7", name: "Task: App Setup", type: "task", title: "High Priority" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "dev3",
        name: "Navneet Chadha",
        title: "Backend Developer",
        children: [
          {
            id: "proj4",
            name: "Database",
            type: "project",
            title: "Data Infrastructure",
            children: [
              {
                id: "sprint5",
                name: "Sprint 1",
                type: "sprint",
                title: "Q1 2024",
                children: [
                  { id: "task8", name: "Task: Schema Design", type: "task", title: "Critical" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "dev4",
        name: "Emily Davis",
        title: "DevOps Engineer",
      },
      {
        id: "dev5",
        name: "James Wilson",
        title: "QA Engineer",
      },
    ],
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-6 left-6 z-20 bg-dark-800/90 backdrop-blur-sm border border-dark-700 px-6 py-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Project Hierarchy</h1>
            <p className="text-sm text-dark-400">Team → Projects → Sprints → Tasks</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-6 right-6 z-20 bg-dark-800/90 backdrop-blur-sm border border-dark-700 px-4 py-3 rounded-xl shadow-xl">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-primary-500 to-emerald-500"></div>
            <span className="text-dark-300">Developer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-pink-600"></div>
            <span className="text-dark-300">Project</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <span className="text-dark-300">Sprint</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-500 to-orange-500"></div>
            <span className="text-dark-300">Task</span>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <OrgChart
          ref={orgChartRef}
          datasource={chartData}
          collapsible={true}
          pan={true}
          zoom={true}
          zoominLimit={7}
          zoomoutLimit={0.5}
          chartClass="orgchart-sprintsight"
          containerClass="orgchart-container-sprintsight"
          NodeTemplate={CustomNodeTemplate}
        />
      </div>
    </div>
  );
}
