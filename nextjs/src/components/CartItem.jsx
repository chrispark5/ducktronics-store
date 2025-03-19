import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useCartStore } from "@/hooks/CartStore";

const CartItem = ({ item }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeItemCompletely = useCartStore(
    (state) => state.removeItemCompletely
  );
  const [basicModal, setBasicModal] = useState(false);
  const [itemId, setItemId] = useState(-1);

  const toggleOpen = () => setBasicModal(!basicModal);
  const askToRemove = (itemId) => {
    setItemId(itemId);
    toggleOpen();
  };
  return (
    <>
      <MDBCard className="rounded-3 mb-4">
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="2" lg="2" xl="2">
              <MDBCardImage
                className="rounded-3"
                fluid
                src={item.image}
                alt={item.name}
              />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <p className="lead fw-normal mb-2">{item.name}</p>
            </MDBCol>
            <MDBCol
              md="3"
              lg="3"
              xl="2"
              className="d-flex align-items-center justify-content-around"
            >
              <MDBBtn
                color="link"
                className="px-2"
                onClick={() => removeFromCart(item.id)}
              >
                <MDBIcon fas icon="minus" />
              </MDBBtn>

              <MDBInput
                min={1}
                value={item.quantity}
                type="number"
                size="sm"
                readOnly
              />

              <MDBBtn
                color="link"
                className="px-2"
                onClick={() => addToCart(item)}
              >
                <MDBIcon fas icon="plus" />
              </MDBBtn>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
              <MDBTypography tag="h5" className="mb-0">
                $
                {item.price &&
                  (item.price.toFixed(2) * item.quantity).toFixed(2)}
              </MDBTypography>
            </MDBCol>
            <MDBCol md="1" lg="1" xl="1" className="text-end">
              <a
                href="#!"
                className="text-danger"
                onClick={() => askToRemove(item.id)}
              >
                <MDBIcon fas icon="trash text-danger" size="lg" />
              </a>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Delete this item from your cart?</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={() => removeItemCompletely(itemId)}>
                Delete
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CartItem;
