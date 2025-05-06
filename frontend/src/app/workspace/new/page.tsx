"use client";

import { useState } from "react";
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";
import MediaItemTabs from "@/components/media/MediaItemsTabs";
import { ChevronDown, ChevronRight, Lock } from "lucide-react";
import clsx from "clsx";

export default function NewWorkspacePage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [showMediaItems, setShowMediaItems] = useState(false);

  const handleToggle = () => {
    if (workspaceId) {
      setShowMediaItems((prev) => !prev);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8 ">
      <WorkspaceForm onSaved={setWorkspaceId} />

      <div className="mt-8 pt-6 bg-white p-6 rounded-lg">
        <div
          className={clsx(
            "flex items-center px-4 py-3 rounded-md",
            " cursor-pointer transition-colors",
            workspaceId ? "bg-gray-50 hover:bg-gray-100" : " cursor-not-allowed"
          )}
          onClick={handleToggle}
        >
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">2</span>
          </div>
          <h3 className="text-2xl font-bold">&nbsp;Add Media Items</h3>
        </div>

        {true && (
          <div className="mt-4">
            <MediaItemTabs workspaceId={workspaceId} />
          </div>
        )}
      </div>
      <div className="flex justify-center ">
        <button className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-64 cursor-pointer">
          Proceed
        </button>
      </div>
    </div>
  );
}
