import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Route {
  side_route: string;
  description: string;
  number_of_street_poles: number;
  price_per_street_pole: number;
  images: string[];
}
interface Props {
  onSubmit: (routes: Route[]) => void;
}
export default function StreetpoleForm({ onSubmit }: Props) {
  const [routes, setRoutes] = useState<Route[]>([
    {
      side_route: "",
      description: "",
      number_of_street_poles: 0,
      price_per_street_pole: 0,
      images: [""],
    },
  ]);
  const handleChange = (index: number, key: keyof Route, value: any) => {
    const updated = [...routes];
    updated[index][key] = value as never;
    setRoutes(updated);
  };
  const handleImageChange = (
    index: number,
    imageIndex: number,
    value: string
  ) => {
    const updated = [...routes];
    updated[index].images[imageIndex] = value;
    setRoutes(updated);
  };
  const addRoute = () => {
    if (routes.length < 5) {
      setRoutes([
        ...routes,
        {
          side_route: "",
          description: "",
          number_of_street_poles: 0,
          price_per_street_pole: 0,
          images: [""],
        },
      ]);
    }
  };
  const removeRoute = (index: number) => {
    const updated = [...routes];
    updated.splice(index, 1);
    setRoutes(updated);
  };
  const submit = () => {
    onSubmit(routes);
  };
  return (
    <div className="space-y-4">
      {" "}
      {routes.map((route, index) => (
        <div key={index} className="border p-4 rounded space-y-2 relative">
          {" "}
          <h3 className="font-bold">Streetpole Route #{index + 1}</h3>{" "}
          <label className="block font-semibold">Side Route</label>
          <Input
            value={route.side_route}
            className="w-lg border-gray-400"
            onChange={(e) => handleChange(index, "side_route", e.target.value)}
          />{" "}
          <label className="block font-semibold">Description</label>
          <Input
            value={route.description}
            className="w-lg border-gray-400"
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />{" "}
          <label className="block font-semibold">Number of Street Poles</label>
          <Input
            type="number"
            className="w-lg border-gray-400"
            value={route.number_of_street_poles}
            onChange={(e) =>
              handleChange(
                index,
                "number_of_street_poles",
                Number(e.target.value)
              )
            }
          />{" "}
          <label className="block font-semibold">Price per Street Pole</label>
          <Input
            placeholder="Price per Street Pole"
            className="w-lg border-gray-400"
            type="number"
            value={route.price_per_street_pole}
            onChange={(e) =>
              handleChange(
                index,
                "price_per_street_pole",
                Number(e.target.value)
              )
            }
          />{" "}
          <label className="block font-semibold">Image URL</label>
          <Input
            className="w-lg border-gray-400"
            value={route.images[0]}
            onChange={(e) => handleImageChange(index, 0, e.target.value)}
          />{" "}
          {routes.length > 1 && (
            <Button onClick={() => removeRoute(index)} className="bg-red-500">
              Remove{" "}
            </Button>
          )}{" "}
        </div>
      ))}{" "}
      <div className="flex gap-2">
        {" "}
        <Button
          onClick={addRoute}
          disabled={routes.length >= 5}
          className="cursor-pointer bg-white outline-1 text-black-600"
        >
          + Add Route{" "}
        </Button>
        <Button onClick={submit}>Submit Streetpoles</Button>{" "}
      </div>{" "}
    </div>
  );
}
