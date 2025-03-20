import React, { useState } from "react";
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

export default function ProductCards() {
  const cartItems = useCartStore((state) => state.cartItems);

  // State for discount code and total amount
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // Calculate the total amount
  const originalTotalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = isDiscountApplied ? originalTotalAmount : 0;
  const totalAmount = originalTotalAmount - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode === "duckracewinner") {
      setIsDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <div className="my-20">
      <SearchAppBar />
      <section className="h-100">
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
                    className="ms-3 w-100"
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
                  <MDBBtn className="ms-3" color="primary" block size="lg">
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
                    className="mb-1"
                  />
                  <MDBRow className="mb-3">
                    <MDBCol md="6">
                      <MDBInput
                        label="Expiry Date"
                        size="lg"
                        type="text"
                        className="mb-1"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        label="CVV"
                        size="lg"
                        type="text"
                        className="mb-1"
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
                    className="mb-1"
                  />
                  <MDBInput
                    label="Address Line 1"
                    size="lg"
                    type="text"
                    className="mb-1"
                  />
                  <MDBInput
                    label="Address Line 2"
                    size="lg"
                    type="text"
                    className="mb-1"
                  />
                  <MDBInput
                    label="City"
                    size="lg"
                    type="text"
                    className="mb-1"
                  />
                  <MDBRow className="mb-3">
                    <MDBCol md="6">
                      <MDBInput label="State" size="lg" type="text" />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput label="ZIP Code" size="lg" type="text" />
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
