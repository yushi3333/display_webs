import React, { useEffect, useRef } from "react";
import { loadPayPalSdk } from "../utils/loadPayPalSdk";
import "./Fastline.css"

const Fastlane = ({ clientId, onTransactionSuccess, totalAmount }) => {
  const buttonContainerRef = useRef(null);
  const isButtonRendered = useRef(false); // Track if the button has been rendered

  useEffect(() => {
    // Load PayPal SDK dynamically
    loadPayPalSdk(clientId, "buttons,fastlane")
      .then(() => {
        if (!isButtonRendered.current && window.paypal) {
          // Render PayPal button only once
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                const formattedAmount = parseFloat(totalAmount).toFixed(2); 
                console.log("Transaction Amount:", formattedAmount);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: formattedAmount, // Set your amount here
                      },
                    },
                  ],
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                  console.log("Transaction completed:", details);
                  onTransactionSuccess(details);
                });
              },
              onError: (err) => {
                console.error("PayPal Error:", err);
              },
            })
            .render(buttonContainerRef.current);

          isButtonRendered.current = true; // Mark as rendered
        }
      })
      .catch((err) => {
        console.error("Failed to load PayPal SDK", err);
      });
  }, [clientId, onTransactionSuccess]);

  return (
    <div class="payment-container">
      <h2>Payment</h2>


      <div id="paypal-button-container" ref={buttonContainerRef} ></div>
    </div>
  );
};

export default Fastlane;
