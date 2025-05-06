"use client";

// import { useParams } from "next/navigation";
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";
import MediaItemTabs from "@/components/media/MediaItemsTabs";
type Props = {
  workspaceId?: string;
};

export default function EditWorkspacePage({ workspaceId }: Props) {
  return (
    <div className="p-6">
      <WorkspaceForm workspaceId={workspaceId} />
      <div className="mt-10 border rounded-lg">
        <MediaItemTabs workspaceId={workspaceId ?? ""} />
      </div>
    </div>
  );
}
