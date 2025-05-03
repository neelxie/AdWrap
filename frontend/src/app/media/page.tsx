"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mb-4 flex space-x-4">
        <select className="border border-gray-300 rounded-md p-2">
          <option>Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Client</option>
          <option>Skynet Media</option>
          <option>Anyong Road</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Method</option>
          <option>Standard</option>
          <option>1 Face</option>
          <option>2 Face</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b border-gray-200">Status</th>
              <th className="px-4 py-2 border-b border-gray-200">Client</th>
              <th className="px-4 py-2 border-b border-gray-200">Invoice #</th>
              <th className="px-4 py-2 border-b border-gray-200">Method</th>
              <th className="px-4 py-2 border-b border-gray-200">Amount</th>
              <th className="px-4 py-2 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Accepted
                </span>
              </td>
              <td className="px-4 py-2">Skynet Media</td>
              <td className="px-4 py-2">INV-001</td>
              <td className="px-4 py-2">Standard</td>
              <td className="px-4 py-2">USD 1,000.00</td>
              <td className="px-4 py-2">
                <Button>View</Button>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Declined
                </span>
              </td>
              <td className="px-4 py-2">Anyong Road</td>
              <td className="px-4 py-2">INV-002</td>
              <td className="px-4 py-2">1 Face</td>
              <td className="px-4 py-2">USD 2,000.00</td>
              <td className="px-4 py-2">
                <Button>View</Button>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Declined
                </span>
              </td>
              <td className="px-4 py-2">Skynet Media</td>
              <td className="px-4 py-2">INV-003</td>
              <td className="px-4 py-2">Standard</td>
              <td className="px-4 py-2">USD 1,500.00</td>
              <td className="px-4 py-2">
                <Button>View</Button>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Accepted
                </span>
              </td>
              <td className="px-4 py-2">Anyong Road</td>
              <td className="px-4 py-2">INV-004</td>
              <td className="px-4 py-2">2 Face</td>
              <td className="px-4 py-2">USD 1,200.00</td>
              <td className="px-4 py-2">
                <Button>View</Button>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Declined
                </span>
              </td>
              <td className="px-4 py-2">Skynet Media</td>
              <td className="px-4 py-2">INV-005</td>
              <td className="px-4 py-2">1 Face</td>
              <td className="px-4 py-2">USD 1,800.00</td>
              <td className="px-4 py-2">
                <Button>View</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
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
    </main>
  );
}
