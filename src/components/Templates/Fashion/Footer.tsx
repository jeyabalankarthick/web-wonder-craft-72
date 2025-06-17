import { useState } from "react";
import { Instagram, Facebook, Twitter, Mail, Pencil, Check } from "lucide-react";

const EditableText = ({
  text,
  onSave,
  className,
  textarea = false,
}: {
  text: string;
  onSave: (newValue: string) => void;
  className?: string;
  textarea?: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleSave = () => {
    setEditing(false);
    onSave(value);
  };

  return editing ? (
    <div className="flex items-start space-x-2">
      {textarea ? (
        <textarea
          className={`border border-gray-300 px-2 py-1 w-full text-sm ${className}`}
          value={value}
          rows={3}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <input
          className={`border-b border-gray-300 px-1 ${className}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      )}
      <Check className="w-4 h-4 text-green-500 cursor-pointer mt-1" onClick={handleSave} />
    </div>
  ) : (
    <div className="flex items-start space-x-2 group">
      <span className={className}>{text}</span>
      <Pencil
        className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer opacity-0 group-hover:opacity-100"
        onClick={() => setEditing(true)}
      />
    </div>
  );
};

const EditableList = ({
  items,
  setItems,
  className,
}: {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}) => {
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  return (
    <ul className="space-y-2 text-sm">
      {items.map((item, idx) => (
        <li key={idx}>
          <EditableText
            text={item}
            onSave={(val) => updateItem(idx, val)}
            className={className}
          />
        </li>
      ))}
    </ul>
  );
};

const Footer = () => {
  const [brandName, setBrandName] = useState("Pocket Angadi");
  const [aboutText, setAboutText] = useState(
    "Discover the latest fashion trends with our curated collection of premium clothing and accessories."
  );
  const [newsletterText, setNewsletterText] = useState(
    "Subscribe to get updates on new collections and exclusive offers."
  );
  const [shopLinks, setShopLinks] = useState(["Women", "Men", "Accessories", "Sale"]);
  const [customerLinks, setCustomerLinks] = useState([
    "Contact Us",
    "Size Guide",
    "Shipping Info",
    "Returns",
  ]);
  const [copyright, setCopyright] = useState(
    "© 2024 AUXE. All rights reserved."
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <EditableText
              text={brandName}
              onSave={setBrandName}
              className="text-2xl font-bold tracking-tight"
            />
            <EditableText
              text={aboutText}
              onSave={setAboutText}
              className="text-gray-600 text-sm"
              textarea
            />
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <EditableText
              text="Shop"
              onSave={() => {}}
              className="font-semibold text-gray-900"
            />
            <EditableList items={shopLinks} setItems={setShopLinks} className="text-gray-600 hover:text-gray-900" />
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <EditableText
              text="Customer Service"
              onSave={() => {}}
              className="font-semibold text-gray-900"
            />
            <EditableList items={customerLinks} setItems={setCustomerLinks} className="text-gray-600 hover:text-gray-900" />
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <EditableText
              text="Stay Updated"
              onSave={() => {}}
              className="font-semibold text-gray-900"
            />
            <EditableText
              text={newsletterText}
              onSave={setNewsletterText}
              className="text-gray-600 text-sm"
              textarea
            />
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <EditableText
            text={copyright}
            onSave={setCopyright}
            className="text-center"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
