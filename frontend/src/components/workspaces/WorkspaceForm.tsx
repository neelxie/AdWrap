"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  workspaceId?: string;
  onSaved?: (workspaceId: string) => void;
  // onSubmit: (workspace: {
  //   name: string;
  //   email: string;
  //   location: string;
  //   address: string;
  // }) => void;
};

export default function WorkspaceForm({ workspaceId }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(form);
  };

  return (
    <div>
      {!workspaceId ? (
        <div className="bg-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            {/* make a black circle with 1 in the middle*/}
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold">Workspace Details</h3>
          </div>
          <div className="text-gray-500 my-4">
            Provide details for your workspace in the fields below
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/*Add labels to all inputs */}
            <label htmlFor="name" className="block font-semibold">
              Business Name
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-lg border-gray-400"
            />
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-lg border-gray-400"
            />
            <label htmlFor="location" className="block font-semibold">
              Location
            </label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-lg border-gray-400"
            />
            <label htmlFor="address" className="block font-semibold">
              Address
            </label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-lg border-gray-400"
            />

            <Button type="submit" className="bg-black text-white">
              Save and Proceed
            </Button>
          </form>
        </div>
      ) : (
        <h2 className="text-2xl font-bold">View Workspace</h2>
      )}
    </div>
  );
}
