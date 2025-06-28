import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Container, Spinner, InputGroup } from "react-bootstrap";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCity, FaRoad, FaLocationArrow } from "react-icons/fa";

const AddressForm = ({
  onAddressAdded,
  onAddressUpdated,
  initialAddress = null,
  isEditable = false,
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

  const defaultAddress = {
    shippingName: "",
    shippingNumber: "",
    street: "",
    landmark: "",
    city: "Kolkata",
    pin: "",
    state: "West Bengal",
  };

  const [address, setAddress] = useState(initialAddress || defaultAddress);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const { shippingName, shippingNumber, street, pin, city, landmark } = address;

    if (!shippingName || !shippingNumber || !street || !pin || !city || !landmark) {
      toast.warn("All fields are required.");
      return false;
    }

    if (shippingNumber.length !== 10 || isNaN(shippingNumber)) {
      toast.warn("Invalid mobile number. Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (pin.length !== 6 || isNaN(pin)) {
      toast.warn("Invalid pin code. Please enter a valid 6-digit pin code.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");

      const url = "https://mj-store.onrender.com/api/v1/user/address";
      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to save address.");

      toast.success(
        result.message || (isEditable ? "Address updated successfully." : "Address added successfully.")
      );

      isEditable ? onAddressUpdated(result.data) : onAddressAdded(result.data);
    } catch (error) {
      toast.error(error.message || "An error occurred while saving the address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 p-3 rounded shadow-lg bg-light">
      <h2 className="text-center mb-4">{isEditable ? "Edit Address" : "Add Address"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="shippingName"
              value={address.shippingName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaPhone />
            </InputGroup.Text>
            <Form.Control
              type="tel"
              name="shippingNumber"
              value={address.shippingNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaRoad />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Enter your street"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Landmark</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="landmark"
              value={address.landmark}
              onChange={handleChange}
              placeholder="Enter a nearby landmark"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaLocationArrow />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="state"
              value={address.state}
              disabled
              readOnly
              placeholder="State"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaCity />
            </InputGroup.Text>
            <Form.Select name="city" value={address.city} onChange={handleChange}>
              {westBengalCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pin Code</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <Form.Control
              type="number"
              name="pin"
              value={address.pin}
              onChange={handleChange}
              placeholder="Enter your pin code"
            />
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : isEditable ? "Update Address" : "Add Address"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddressForm;
