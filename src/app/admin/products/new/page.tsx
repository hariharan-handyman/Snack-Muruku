"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    Save,
    Loader2,
    X,
    PackageCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IKContext, IKUpload } from "imagekitio-react";

export default function NewProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Savories");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const onUploadError = (err: any) => {
        console.error("Upload Error:", err);
        alert("Image upload failed. Please try again.");
        setUploadProgress(0);
    };

    const onUploadSuccess = (res: any) => {
        setImageUrl(res.url);
        setUploadProgress(100);
    };

    const onUploadProgress = (progress: any) => {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) return alert("Please upload an image first.");

        setLoading(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    category,
                    price: parseFloat(price),
                    weight: parseInt(weight),
                    stock: parseInt(stock),
                    description,
                    imageUrl,
                }),
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                alert("Failed to create product");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-secondary font-serif">Add New Product</h1>
                    <p className="text-secondary/50">Expand your premium snack collection</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-secondary">Product Name</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Classic Handmade Muruku"
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                >
                                    <option>Savories</option>
                                    <option>Sweets</option>
                                    <option>Gift Boxes</option>
                                    <option>Traditional Mix</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Price (₹)</label>
                                <input
                                    required
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="250"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Weight (grams)</label>
                                <input
                                    required
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="500"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Initial Stock</label>
                                <input
                                    required
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="100"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-secondary">Description</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Share the story and ingredients of this heritage snack..."
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-secondary mb-2 block">Product Image</label>

                        <IKContext
                            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
                            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                            authenticator={async () => {
                                const res = await fetch("/api/imagekit-auth");
                                return await res.json();
                            }}
                        >
                            <div className="relative group">
                                <IKUpload
                                    fileName={`${name.toLowerCase().replace(/ /g, "-") || "product"}.jpg`}
                                    tags={["product"]}
                                    useUniqueFileName={true}
                                    onError={onUploadError}
                                    onSuccess={onUploadSuccess}
                                    onUploadProgress={onUploadProgress}
                                    style={{ display: "none" }}
                                    id="image-upload"
                                />

                                <label
                                    htmlFor="image-upload"
                                    className={`
                    flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed 
                    ${imageUrl ? "border-primary/20 bg-primary/5" : "border-gray-200 hover:border-primary/50"} 
                    rounded-2xl cursor-pointer transition-all overflow-hidden relative
                  `}
                                >
                                    {imageUrl ? (
                                        <>
                                            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <p className="text-white text-xs font-bold bg-primary px-3 py-1 rounded-full">Change Image</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className={`w-8 h-8 ${uploadProgress > 0 ? "text-primary animate-bounce" : "text-gray-400"}`} />
                                            <p className="mt-2 text-xs font-bold text-gray-400">
                                                {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : "Click to Upload"}
                                            </p>
                                        </>
                                    )}
                                </label>

                                {imageUrl && (
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl("")}
                                        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-lg border border-red-200 shadow-sm"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </IKContext>
                        <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-bold">Square images (1:1) recommended</p>
                    </div>

                    <div className="bg-secondary p-6 rounded-3xl text-white space-y-4 shadow-xl shadow-secondary/20">
                        <div className="flex items-center gap-3">
                            <PackageCheck className="text-primary w-6 h-6" />
                            <h4 className="font-bold font-serif">Ready to publish?</h4>
                        </div>
                        <p className="text-xs text-white/60">This product will be immediately available for customers worldwide.</p>
                        <button
                            disabled={loading || !imageUrl}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {loading ? "Creating..." : "Save Product"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
