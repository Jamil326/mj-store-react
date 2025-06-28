import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Container, Spinner } from "react-bootstrap";

const AddressForm = ({ 
  onAddressAdded, 
  onAddressUpdated, 
  initialAddress = null, 
  isEditable = false 
}) => {
  const westBengalCities = [
    "Kolkata",
    "Darjeeling",
    "Siliguri",
    "Asansol",
    "Durgapur",
    "Howrah",
    "Hooghly",
    "Kharagpur",
    "Malda",
    "Jalpaiguri",
  ];

  const [address, setAddress] = useState(
    initialAddress || {
      name: "",
      mobile: "",
      street: "",
      landmark: "",
      city: "Kolkata",
      pin: "",
      state: "West Bengal",
    }
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.street || !address.pin || !address.city || !address.landmark) {
      toast.warn("All fields are required.");
      return;
    }

    if (address.pin.length !== 6 || isNaN(address.pin)) {
      toast.warn("Invalid pin code. Please enter a valid 6-digit pin code.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      if (!token) throw new Error("Token is required");

      const url = isEditable
        ? "https://mj-store.onrender.com/api/v1/user/address"
        : "https://mj-store.onrender.com/api/v1/user/address";

      const method = isEditable ? "POST" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message || (isEditable ? "Address updated successfully" : "Address added successfully"));
      
      if (isEditable) {
        onAddressUpdated(result.data); // Pass updated address to parent
      } else {
        onAddressAdded(result.data); // Pass added address to parent
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 p-3 rounded shadow-lg bg-light">
      <h2 className="text-center mb-4">
        {isEditable ? "Edit Address" : "Add Address"}
      </h2>
      
      {/* Display User Info */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={address.name || JSON.parse(localStorage.getItem("user-info") || "{}").name || ""}
          readOnly
          placeholder="Your Name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="text"
          name="mobile"
          value={address.mobile || JSON.parse(localStorage.getItem("user-info") || "{}").mobile || ""}
          readOnly
          placeholder="Your Mobile Number"
        />
      </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Enter your street"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Landmark</Form.Label>
          <Form.Control
            type="text"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            placeholder="Enter a nearby landmark"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={address.state}
            disabled
            readOnly
            placeholder="State"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select name="city" value={address.city} onChange={handleChange}>
            {westBengalCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            type="number"
            name="pin"
            value={address.pin}
            onChange={handleChange}
            placeholder="Enter your pin code"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100"
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : isEditable ? (
            "Update Address"
          ) : (
            "Add Address"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AddressForm;
