import { useRef, useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import "./herosection.css";

const HeroSection = () => {
  const [title, setTitle] = useState("NEW COLLECTION");
  const [tempTitle, setTempTitle] = useState(title);
  const [editingTitle, setEditingTitle] = useState(false);

  const [desc, setDesc] = useState("Discover the latest trends in fashion");
  const [tempDesc, setTempDesc] = useState(desc);
  const [editingDesc, setEditingDesc] = useState(false);

  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=2000&q=80");
  const [updateMessage, setUpdateMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showUpdateMessage = (msg: string) => {
    setUpdateMessage(msg);
    setTimeout(() => setUpdateMessage(""), 2000);
  };

  const handleEditClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setBgImage(ev.target.result as string);
        showUpdateMessage("Background image updated");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative h-[60vh] sm:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Hero" className="w-full h-full object-cover transition-all duration-500" />
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 z-20 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
          title="Edit background image"
        >
          <Pencil className="w-5 h-5 text-gray-800" />
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
        {/* Editable Title */}
        <div className="mb-4">
          {editingTitle ? (
            <div className="flex flex-col items-center gap-2">
              <input
                className="text-3xl sm:text-5xl font-bold text-center text-black px-4 py-2 rounded w-full max-w-xl"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTitle(tempTitle);
                    setEditingTitle(false);
                    showUpdateMessage("Title updated");
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setTempTitle(title);
                    setEditingTitle(false);
                  }}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide relative inline-flex items-center">
              {title}
              <button
                onClick={() => setEditingTitle(true)}
                className="ml-3 text-white bg-white/20 hover:bg-white/40 p-1 rounded-full"
              >
                <Pencil size={18} />
              </button>
            </h1>
          )}
        </div>

        {/* Editable Description */}
        <div className="mb-6">
          {editingDesc ? (
            <div className="flex flex-col items-center gap-2">
              <input
                className="text-lg sm:text-xl text-black text-center px-4 py-2 rounded w-full max-w-2xl"
                value={tempDesc}
                onChange={(e) => setTempDesc(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setDesc(tempDesc);
                    setEditingDesc(false);
                    showUpdateMessage("Description updated");
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setTempDesc(desc);
                    setEditingDesc(false);
                  }}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-light opacity-90 relative inline-flex items-center">
              {desc}
              <button
                onClick={() => setEditingDesc(true)}
                className="ml-3 text-white bg-white/20 hover:bg-white/40 p-1 rounded-full"
              >
                <Pencil size={18} />
              </button>
            </p>
          )}
        </div>

        {/* Update Message */}
        {/* {updateMessage && (
          <div className="text-green-300 text-sm mt-2 transition-opacity">{updateMessage}</div>
        )} */}
      </div>
    </section>
  );
};

export default HeroSection;
