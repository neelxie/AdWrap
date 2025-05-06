"use client";

import { useState } from "react";
import StaticMediaForm from "./StaticMediaForm";
import StreetpoleForm from "./StreetpoleForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MediaItemTabs({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [tab, setTab] = useState("static");

  return (
    <div className="mt-6">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger
            value="static"
            className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:font-bold"
          >
            Static Media
          </TabsTrigger>
          <TabsTrigger
            value="streetpole"
            className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:font-bold"
          >
            Streetpoles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="static">
          <StaticMediaForm workspaceId={workspaceId} />
        </TabsContent>
        <TabsContent value="streetpole">
          <StreetpoleForm workspaceId={workspaceId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
