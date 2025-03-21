import React from "react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconDeviceLaptop,
  IconHome,
  IconMail,
  IconPhone,
  IconPrinter,
  IconShoppingCart,
} from "@tabler/icons-react"; // Import Tabler icons

export default function NewFooter() {
  return (
    <footer className="text-center text-lg-start text-muted bg-light">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Follow Ducktronics for the latest in duck tech!</span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <a href="#" className="text-reset">
            <IconBrandFacebook size={24} />
          </a>
          <a href="#" className="text-reset">
            <IconBrandTwitter size={24} />
          </a>
          <a href="#" className="text-reset">
            <IconBrandInstagram size={24} />
          </a>
          <a href="#" className="text-reset">
            <IconBrandLinkedin size={24} />
          </a>
          <a href="#" className="text-reset">
            <IconBrandGithub size={24} />
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <IconDeviceLaptop className="me-3" />
                Ducktronics
              </h6>
              <p>
                Your one-stop shop for the best in duck-friendly technology!
                From the newest qPhones to boomBoxes, we've got it all.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Shop</h6>
              <p>
                <a href="/products" className="text-reset">
                  All Products
                </a>
              </p>
              <p>
                <a href="/categories/waterproof" className="text-reset">
                  Waterproof Tech
                </a>
              </p>
              <p>
                <a href="/categories/smart-home" className="text-reset">
                  Smart Nest Devices
                </a>
              </p>
              <p>
                <a href="/categories/accessories" className="text-reset">
                  Duck Accessories
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Customer Service</h6>
              <p>
                <a href="/404" className="text-reset">
                  Support Center
                </a>
              </p>
              <p>
                <a href="/404" className="text-reset">
                  Shipping Info
                </a>
              </p>
              <p>
                <a href="/404" className="text-reset">
                  Returns & Refunds
                </a>
              </p>
              <p>
                <a href="/404" className="text-reset">
                  FAQs
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>

              <div className="d-flex align-items-center mb-2">
                <IconHome className="me-2" size={20} />
                <span>123 Duck Pond Ave, Quack City, DU 54321</span>
              </div>

              <div className="d-flex align-items-center mb-2">
                <IconMail className="me-2" size={20} />
                <span>support@ducktronics.com</span>
              </div>

              <div className="d-flex align-items-center mb-2">
                <IconPhone className="me-2" size={20} />
                <span>+1 (555) DUCK-TECH</span>
              </div>

              <div className="d-flex align-items-center">
                <IconPrinter className="me-2" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2025 Ducktronics - Your Trusted Duck Tech Provider.
        <a className="text-reset fw-bold" href="/">
          {" "}
          Visit Ducktronics
        </a>
      </div>
    </footer>
  );
}
