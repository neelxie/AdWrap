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
import { RootState } from "@/redux/store";
import { setWorkspace } from "@/redux/features/workspace/workspaceSlice";
import { setMediaItem } from "@/redux/features/mediaItem/mediaItemSlice";
import Link from "next/link";

export default function WorkspaceDashboard() {
  const [search, setSearch] = useState("");
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const dispatch = useDispatch();
  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspaces
  );

  useEffect(() => {
    const controller = new AbortController();
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workspaces${
            search ? `/search?q=${search}` : "/"
          }`,
          { signal: controller.signal }
        );
        const data = await res.json();
        dispatch(setWorkspace(data));
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    };
    const fetchMediaItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media/`
        );
        const data = await res.json();
        dispatch(setMediaItem(data));
      } catch (error) {
        console.error("Failed to fetch media items:", error);
      }
    };

    fetchWorkspaces();
    fetchMediaItems();
    return () => {
      controller.abort();
    };
  }, [dispatch, search]);

  useEffect(() => {
    const handleClickOutside = () => setMenuOpenFor(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <main className="p-8 max-w-6xl mx-auto bg-white">
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
        <Link href="/media">
          <Button className="bg-white text-dark hover:bg-blue-100 outline cursor-pointer">
            <List className="w-4 h-4 text-muted-foreground mr-2" />
            View media items
          </Button>
        </Link>
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
                    ? "border-b border-gray-300 hover:bg-blue-100 cursor-pointer"
                    : "hover:bg-blue-100 cursor-pointer"
                }
              >
                <td className="px-4 py-2">{workspace.name}</td>
                <td className="px-4 py-2">{workspace.email}</td>
                <td className="px-4 py-2 hidden md:table-cell">
                  {workspace.address}
                </td>
                <td className="px-4 py-2 hidden sm:table-cell">
                  {workspace.location}
                </td>
                <td
                  className="px-4 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenFor((prev) =>
                      prev === workspace.id ? null : workspace.id
                    );
                  }}
                >
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <img src="/actions.svg" alt="Actions" />
                  </span>
                  {menuOpenFor === workspace.id && (
                    <div className="absolute mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          setMenuOpenFor(null);
                          // handleUpdate(item)
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          setMenuOpenFor(null);
                          // handleDelete(item)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {workspaces.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No workspaces found.
        </p>
      )}
    </main>
  );
}
