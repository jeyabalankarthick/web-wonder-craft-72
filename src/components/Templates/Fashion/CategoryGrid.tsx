import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface Category {
  title: string;
  image: string;
  link: string;
}

const initialCategories: Category[] = [
  {
    title: "Women",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=women",
  },
  {
    title: "Men",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=men",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    link: "/products?category=accessories",
  },
];

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempCategory, setTempCategory] = useState<Category>({
    title: "",
    image: "",
    link: "",
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showUpdateMessage = (msg: string) => {
    setUpdateMessage(msg);
    setTimeout(() => setUpdateMessage(""), 2000);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setTempCategory({ ...categories[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const updated = [...categories];
    updated[editingIndex] = tempCategory;
    setCategories(updated);
    setEditingIndex(null);
    showUpdateMessage("Category updated");
  };

  const handleFieldChange = (field: keyof Category, value: string) => {
    setTempCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        handleFieldChange("image", ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 animate-fade-in-up">
      {/* Toast */}
      {updateMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm animate-fade-in-up z-50">
          ✅ {updateMessage}
        </div>
      )}

      {/* Heading */}
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
          Shop by Category
        </h2>
      </div>

      {/* Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg border border-gray-200"
          >
            {editingIndex === idx ? (
              <div className="bg-white p-4 flex flex-col justify-between h-full">
                {/* Image Editor */}
                <div className="relative mb-4">
                  <img
                    src={tempCategory.image}
                    alt={tempCategory.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
                    title="Change image"
                  >
                    <Pencil size={16} />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  value={tempCategory.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="border px-2 py-1 rounded mb-2 w-full text-center"
                />

                {/* Link Input */}
                {/* <input
                  type="text"
                  value={tempCategory.link}
                  onChange={(e) => handleFieldChange("link", e.target.value)}
                  className="border px-2 py-1 rounded mb-4 w-full"
                /> */}

                {/* Save & Cancel */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    title="Save"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 z-0 group">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => startEdit(idx)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200 z-10"
                  title="Edit category"
                >
                  <Pencil size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
