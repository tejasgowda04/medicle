const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const adminEmail = "admin@example.com";
auth.onAuthStateChanged(user => {
  if (!user || user.email !== adminEmail) {
    alert("Access Denied");
    window.location.href = "/index.html";
  } else {
    loadPrescriptions();
    loadPayments();
  }
});
function loadPrescriptions() {
  const list = document.getElementById("prescription-list");
  storage.ref("prescriptions").listAll().then(result => {
    result.items.forEach(fileRef => {
      fileRef.getDownloadURL().then(url => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${url}" target="_blank">${fileRef.name}</a>`;
        list.appendChild(li);
      });
    });
  });
}
function loadPayments() {
  const list = document.getElementById("payment-list");
  db.collection("orders").orderBy("time", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const order = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `✅ ₹${order.amount / 100} - ${order.email} @ ${new Date(order.time).toLocaleString()}`;
      list.appendChild(li);
    });
  });
}