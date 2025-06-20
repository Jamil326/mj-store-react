import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    min: "",
    max: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Pass updated filters to the parent component
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Name Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Product Name"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Category"
          />
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={filters.brand}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Brand"
          />
        </div>

        {/* Min Price Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            name="min"
            value={filters.min}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Min Price"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            name="max"
            value={filters.max}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Max Price"
          />
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;
