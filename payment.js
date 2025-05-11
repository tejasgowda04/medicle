function proceedToPay() {
  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: 50000,
    currency: "INR",
    name: "Pharmacy Store",
    description: "Order Payment",
    handler: function (response) {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      db.collection("orders").add({
        razorpayPaymentId: response.razorpay_payment_id,
        amount: 50000,
        email: user.email,
        time: Date.now()
      }).then(() => {
        alert("Payment successful & order saved!");
        window.location.href = "/success.html";
      });
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}