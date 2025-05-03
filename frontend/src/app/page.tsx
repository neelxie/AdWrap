"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { List, Search } from "lucide-react";

type Workspace = {
  id: string;
  name: string;
  email: string;
  location: string;
  address: string;
};

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Kampala Ads",
    email: "kampala@ads.com",
    location: "Kampala",
    address: "123 Kampala St, Kampala"
  },
  { id: "2", name: "Jinja Media", email: "hello@jinja.com", location: "Jinja", address: "123 Jinja St, Jinja" },
  { id: "3", name: "Gulu Boards", email: "gulu@boards.com", location: "Gulu", address: "123 Gulu St, Gulu" },
];

export default function WorkspaceDashboard() {
  const dispatch = useDispatch(); 
  // const workspaces = useSelector((state) => state.workspace.workspaces);
  const setWorkspaces = (workspaces: Workspace[]) => dispatch({ type: 'workspace/setWorkspaces', payload: workspaces });

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workspaces`);
        const data = await res.json();
        dispatch(setWorkspaces(data));
      } catch (error) {
        console.error('Failed to fetch workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [dispatch]);



  const [search, setSearch] = useState("");
  // const [workspaces, setWorkspaces] = useState(mockWorkspaces);

  const filtered = workspaces?.filter((ws) =>
    ws.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8 max-w-5xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Workspaces</h1>
      </div>

      <div className="flex items-center justify-between flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center w-full md:w-1/2 border rounded-md px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm"
          />
        </div>

        <Button className="bg-black text-white hover:bg-gray-900">
          + New Workspace
        </Button>
        <Button className="bg-white text-dark hover:bg-gray-100 outline">
          <List className="w-4 h-4 text-muted-foreground mr-2" />
          View media items
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                Name
              </th>
              <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                Email
              </th>
              <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden md:table-cell">
                Address
              </th>
              <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                Location
              </th>
              <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {workspaces.map((workspace, index) => (
              <tr
                key={index}
                className={
                  index < workspaces.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }
              >
                <td className="px-4 py-2">{workspace.name}</td>
                <td className="px-4 py-2">{workspace.email}</td>
                <td className="px-4 py-2 hidden md:table-cell">{workspace.address}</td>
                <td className="px-4 py-2 hidden sm:table-cell">{workspace.location}</td>
                <td className="px-4 py-2">
                  
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <img src="/actions.svg" alt="Actions" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No workspaces found.
        </p>
      )}
    </main>
  );
}
