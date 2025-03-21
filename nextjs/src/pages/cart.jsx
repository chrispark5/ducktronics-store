import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import CartItem from "@/components/CartItem";
import { useCartStore } from "@/hooks/CartStore";
import SearchAppBar from "@/components/Navbar";
import { useRouter } from "next/router";
import ImageTrail2 from "@/components/ImageTrail2";

export default function ProductCards() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  // State for discount code and total amount
  const [user, setUser] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const router = useRouter();
  // User information state
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token

    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
      return;
    }

    // Fetch user profile data
    fetch("http://localhost:5001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          // Redirect to login if the token is invalid or expired
          router.push("/login");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        // Pre-fill the form with existing user data if available
        if (data?.address || data?.creditCardInfo) {
          setUserInfo({
            addressLine1: data.address?.addressLine1 || "",
            addressLine2: data.address?.addressLine2 || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || "",
            cardNumber: data.creditCardInfo?.cardNumber || "",
            expiryDate: data.creditCardInfo?.expiryDate || "",
            cvv: data.creditCardInfo?.cvv || "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again.");
      });
  }, [router]);
  // Calculate the total amount
  const originalTotalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = isDiscountApplied ? originalTotalAmount : 0;
  const totalAmount = originalTotalAmount - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode === "duckracewinner" || discountCode === "DUCKHUNTCHAMP") {
      setIsDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    const orderData = {
      userInfo: {
        fullName: userInfo.fullName,
        addressLine1: userInfo.addressLine1,
        addressLine2: userInfo.addressLine2,
        city: userInfo.city,
        state: userInfo.state,
        zipCode: userInfo.zipCode,
      },
      paymentInfo: {
        cardNumber: userInfo.cardNumber,
        expiryDate: userInfo.expiryDate,
        cvv: userInfo.cvv,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        router.push("/confirmation");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="my-20">
      <SearchAppBar />
      <section className="h-100">
        <ImageTrail2 />
        <MDBContainer fluid className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            {/* Left Column: Cart Items */}
            <MDBTypography
              tag="h3"
              className="fw-normal mb-0 text-black text-center"
            >
              Shopping Cart
            </MDBTypography>
            <MDBCol md="7" lg="6" xl="6">
              <div className="d-flex justify-content-center align-items-center mb-4"></div>

              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      isDiscountApplied={isDiscountApplied}
                    />
                  );
                })}
              <MDBCard className="mb-4">
                <MDBCardBody className="p-4 d-flex flex-row">
                  <MDBInput
                    label="Discount code"
                    wrapperClass="flex-fill"
                    size="lg"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <MDBBtn
                    className="ms-3 w-100 custom-button"
                    color="primary"
                    outline
                    size="lg"
                    onClick={handleApplyDiscount}
                  >
                    Apply
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4">
                <MDBCardBody className="p-4 d-flex justify-content-between">
                  <MDBTypography tag="h5" className="fw-normal mb-0">
                    Total Amount:
                  </MDBTypography>
                  <MDBTypography tag="h5" className="fw-bold mb-0">
                    ${totalAmount.toFixed(2)}
                  </MDBTypography>
                </MDBCardBody>
                {isDiscountApplied && (
                  <MDBCardBody className="p-4 d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-success mb-0">
                      Discount Applied:
                    </MDBTypography>
                    <MDBTypography tag="h6" className="text-success mb-0">
                      -${discountAmount.toFixed(2)}
                    </MDBTypography>
                  </MDBCardBody>
                )}
              </MDBCard>

              <MDBCard>
                <MDBCardBody>
                  <MDBBtn
                    className="ms-3 custom-button"
                    color="primary"
                    block
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            {/* Right Column: Credit Card & Shipping Address Form */}
            <MDBCol md="7" lg="6" xl="6">
              <MDBCard className="mb-4">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h4" className="fw-normal mb-4">
                    Payment & Shipping Information
                  </MDBTypography>

                  {/* Credit Card Form */}
                  <MDBTypography tag="h6" className="mb-3">
                    Credit Card Information
                  </MDBTypography>
                  <MDBInput
                    label="Card Number"
                    size="lg"
                    type="text"
                    className="mb-3"
                    name="cardNumber"
                    value={userInfo.cardNumber}
                    onChange={handleInputChange}
                  />
                  <MDBRow className="mb-3">
                    <MDBCol md="6">
                      <MDBInput
                        label="Expiry Date"
                        size="lg"
                        type="text"
                        className="mb-3"
                        name="expiryDate"
                        value={userInfo.expiryDate}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="CVV"
                        size="lg"
                        type="text"
                        className="mb-3"
                        name="cvv"
                        value={userInfo.cvv}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  {/* Add some space between Credit Card and Shipping Address */}
                  <div style={{ marginBottom: "2rem" }}></div>

                  {/* Shipping Address Form */}
                  <MDBTypography tag="h6" className="mb-3">
                    Shipping Address
                  </MDBTypography>
                  <MDBInput
                    label="Full Name"
                    size="lg"
                    type="text"
                    className="mb-3"
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    label="Address Line 1"
                    size="lg"
                    type="text"
                    className="mb-3"
                    name="addressLine1"
                    value={userInfo.addressLine1}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    label="Address Line 2"
                    size="lg"
                    type="text"
                    className="mb-3"
                    name="addressLine2"
                    value={userInfo.addressLine2}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    label="City"
                    size="lg"
                    type="text"
                    className="mb-3"
                    name="city"
                    value={userInfo.city}
                    onChange={handleInputChange}
                  />
                  <MDBRow className="mb-3">
                    <MDBCol md="6">
                      <MDBInput
                        label="State"
                        size="lg"
                        type="text"
                        name="state"
                        value={userInfo.state}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="ZIP Code"
                        size="lg"
                        type="text"
                        name="zipCode"
                        value={userInfo.zipCode}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
