export const PRODUCTS = [
{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "AudioMax",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
},
{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "AudioMax",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
},
{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "AudioMax",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
}
,{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "Wireless",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
}
,{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "BMW",
  category: "Sound",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
}
,{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "AudioMax",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
}
,{
  id: "p1",
  title: "Wireless Headphones X1",
  brand: "AudioMax",
  category: "Audio",
  price: 79.99,
  rating: 4.5,
  image: "/images/headphones.jpg", // لاحظ مفيش "public" هنا
  description: "Comfortable wireless headphones with ANC."
}
,
 
];

export const unique = (arr, key) => [...new Set(arr.map((x) => x[key]))];

export const paginate = (items, page, perPage) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    data: items.slice(start, start + perPage),
    total,
    totalPages,
    page: safePage,
  };
};
