import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface StaticFace {
  description: string;
  availability: string;
  rent: number;
  images: string[];
}
interface Props {
  onSubmit: (faces: StaticFace[]) => void;
}
export default function StaticMediaForm({ onSubmit }: Props) {
  const [faces, setFaces] = useState<StaticFace[]>([
    { description: "", availability: "", rent: 0, images: [""] },
  ]);
  const handleChange = (index: number, key: keyof StaticFace, value: any) => {
    const updated = [...faces];
    updated[index][key] = value as never;
    setFaces(updated);
  };
  const handleImageChange = (
    index: number,
    imageIndex: number,
    value: string
  ) => {
    const updated = [...faces];
    updated[index].images[imageIndex] = value;
    setFaces(updated);
  };
  const addFace = () => {
    if (faces.length < 5) {
      setFaces([
        ...faces,
        { description: "", availability: "", rent: 0, images: [""] },
      ]);
    }
  };
  const removeFace = (index: number) => {
    const updated = [...faces];
    updated.splice(index, 1);
    setFaces(updated);
  };
  const submit = () => {
    onSubmit(faces);
  };
  return (
    <div className="space-y-4">
      {" "}
      {faces.map((face, index) => (
        <div key={index} className="border p-4 rounded space-y-2 relative">
          {" "}
          <h3 className="font-bold">Static Media #{index + 1}</h3>{" "}
          <label className="block font-semibold">Description</label>
          <Input
            className="w-lg border-gray-400"
            value={face.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />{" "}
          <label className="block font-semibold">Availability</label>
          <Input
            className="w-lg border-gray-400"
            value={face.availability}
            onChange={(e) =>
              handleChange(index, "availability", e.target.value)
            }
          />{" "}
          <label className="block font-semibold">Rent</label>
          <Input
            className="w-lg border-gray-400"
            type="number"
            value={face.rent}
            onChange={(e) =>
              handleChange(index, "rent", Number(e.target.value))
            }
          />{" "}
          <label className="block font-semibold">Image URL</label>
          <Input
            className="w-lg border-gray-400"
            value={face.images[0]}
            onChange={(e) => handleImageChange(index, 0, e.target.value)}
          />{" "}
          {faces.length > 1 && (
            <Button onClick={() => removeFace(index)} className="bg-red-500">
              Remove{" "}
            </Button>
          )}{" "}
        </div>
      ))}{" "}
      <div className="flex gap-2">
        {" "}
        <Button
          onClick={addFace}
          disabled={faces.length >= 5}
          className="cursor-pointer bg-white outline-1 text-black-600"
        >
          + Add Static Media
        </Button>
        <Button onClick={submit}>Submit Static Media</Button>{" "}
      </div>{" "}
    </div>
  );
}
