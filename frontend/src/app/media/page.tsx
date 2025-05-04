"use client";

import { Button } from "@/components/ui/button";
import { setMediaItem } from "@/redux/features/mediaItem/mediaItemSlice";
import { setWorkspace } from "@/redux/features/workspace/workspaceSlice";
import { RootState } from "@/redux/store";
import { List, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const mediaItems = useSelector(
    (state: RootState) => state.mediaItem.mediaItems
  );
  const staticMediaItems = mediaItems.filter(item => item.type === 'static');
const streetpoleMediaItems = mediaItems.filter(item => item.type === 'streetpole');
  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media/`
        );
        const data = await res.json();
        dispatch(setMediaItem(data.data));
      } catch (error) {
        console.error("Failed to fetch media items:", error);
      }
    };

    fetchMediaItems();
  }, [dispatch, search]);

  return (
    <main className="p-8 max-w-5xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Media Items</h1>
      </div>

      <div className="flex items-center justify-between flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center w-full md:w-1/2 border rounded-md px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search by location/available"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="staticmedia" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="staticmedia">Static media</TabsTrigger>
          <TabsTrigger value="streetpoles">Street poles</TabsTrigger>
        </TabsList>

        <TabsContent value="staticmedia">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Media ID
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Location
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden md:table-cell">
                    Description
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Media format
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Faces
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Availability
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Rent
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {staticMediaItems?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index < staticMediaItems.length - 1
                        ? "border-b border-gray-300"
                        : ""
                    }
                  >
                    <td className="px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-2 text-blue-500">{item?.code}</td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {item?.location}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {item?.closest_landmark}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {!item?.format ? "None" : item?.format}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {item?.number_of_faces}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {item?.availability === "Available" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Accepted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Declined
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {item?.rent}
                    </td>
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

          {staticMediaItems?.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              No workspaces found.
            </p>
          )}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Each page shows a maximum of 5 items
            </span>
            <div className="flex space-x-2">
              <Button disabled>&laquo; Previous</Button>
              <span className="px-3 py-1 text-sm">1 of 3</span>
              <Button>Next &raquo;</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="streetpoles">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Media ID
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Location
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden md:table-cell">
                    Description
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Media format
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Street Poles
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Availability
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300 hidden sm:table-cell">
                    Rent
                  </th>
                  <th className="text-left px-4 py-2 font-semibold border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {streetpoleMediaItems?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index < streetpoleMediaItems?.length - 1
                        ? "border-b border-gray-300"
                        : ""
                    }
                  >
                    <td className="px-4 py-2">
                      {/* checkbox */}
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-2 text-blue-500">{item?.code}</td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {item.location}
                    </td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {item.closest_landmark}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {!item?.format ? "None" : item?.format}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {!item?.number_of_street_poles ? "None" : item?.number_of_street_poles}
                    </td>
                    <td className="px-4 py-2">
                    {item?.availability === "Available" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Accepted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Declined
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {item.rent}
                    </td>
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

          {streetpoleMediaItems?.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              No workspaces found.
            </p>
          )}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Each page shows a maximum of 5 items
            </span>
            <div className="flex space-x-2">
              <Button disabled>&laquo; Previous</Button>
              <span className="px-3 py-1 text-sm">1 of 3</span>
              <Button>Next &raquo;</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
