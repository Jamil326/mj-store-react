const handleCategoryClick = async (category) => {
  scrollToTop();
  setSelectedCategory(category);

  if (category === "All") {
    // Show all products (no filter)
    setFilteredProducts(allProducts);
    return;
  }

  // Try filtering locally first
  const localMatch = allProducts.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );

  if (localMatch.length > 0) {
    setFilteredProducts(localMatch);
    return;
  }

  // Check cache
  if (categoryCache[category]) {
    setFilteredProducts(categoryCache[category]);
    return;
  }

  // Fetch category from API if not cached or locally found
  setCategoryLoading(true);
  try {
    const res = await fetch("https://mj-store.onrender.com/api/v1/product/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    const data = await res.json();

    if (res.ok && data?.data?.getProduct) {
      const fetched = data.data.getProduct.map((p) => ({ ...p, rating: 4 }));

      setFilteredProducts(fetched);
      setCategoryCache((prev) => ({ ...prev, [category]: fetched }));
    } else {
      toast.warn("No products found in this category.");
      setFilteredProducts([]);
    }
  } catch (err) {
    toast.error("Failed to fetch category products.");
  } finally {
    setCategoryLoading(false);
  }
};
