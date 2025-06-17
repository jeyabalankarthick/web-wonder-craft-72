
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product, useProducts } from "@/context/ProductContext";

interface ProductModalProps {
     open: boolean;
     onOpenChange: (open: boolean) => void;
     product?: Product;
     /** called with the new or updated product when the form is submitted */
     onSave: (product: Product) => void;
   }

export const ProductModal = ({ open, onOpenChange, product, onSave }:  ProductModalProps) => {
  const { toast } = useToast();
  const { getCategories } = useProducts();
  const existingCategories = getCategories();
  
  const [formData, setFormData] = useState<Product>({
        id: product?.id || Date.now().toString(),
        name: product?.name || "",
        price: product?.price || 0,
        originalPrice: product?.originalPrice,
        image: product?.image || "",
        category: product?.category || "",
        status: product?.status || "active",
        stock: product?.stock || 0,
        description: product?.description || "",
    });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        price: product.price || 0,
        originalPrice: product.originalPrice,
        image: product.image || "",
        category: product.category || "",
        status: product.status || "active",
        stock: product.stock || 0,
        description: product.description || "",
      });
    } else {
      // Reset form for new product
      setFormData({
        id: Date.now().toString(),
        name: "",
        price: 0,
        originalPrice: undefined,
        image: "",
        category: "",
        status: "active",
        stock: 0,
        description: "",
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: product ? "Product updated" : "Product created",
      description: `${formData.name} has been ${product ? "updated" : "created"} successfully.`,
    });
    onSave(formData);
  };
  
  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        handleChange("image", ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select or enter category" />
              </SelectTrigger>
              <SelectContent>
                {existingCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="mt-2"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Or type custom category"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label>Product Image</Label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                {product ? "Change Image" : "Upload Image"}
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update" : "Create"} Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
