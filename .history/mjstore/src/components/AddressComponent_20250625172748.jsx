import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Container } from "react-bootstrap";

const AddressForm = ({ onAddressAdded }) => {
  // Cities of West Bengal
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

  const [address, setAddress] = useState({
    street: "",
    landmark: "",
    city: "Kolkata", // Default city
    pin: "",
    state: "West Bengal", // Default state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) throw new Error("Token is required");

      const url = "https://mj-store.onrender.com/api/v1/user/address";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message || "Address added successfully");
      // Notify parent component that the address has been added
      onAddressAdded();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="mt-4 p-3 rounded shadow-lg bg-light">
      <h2 className="text-center mb-4">Fill Up Address</h2>
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

        <Button type="submit" variant="primary" className="w-100">
          Add Address
        </Button>
      </Form>
    </Container>
  );
};

export default AddressForm;
