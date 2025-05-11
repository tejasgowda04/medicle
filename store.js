const db = firebase.firestore();
const list = document.getElementById("medicine-list");
db.collection("medicines").get().then(snapshot => {
  snapshot.forEach(doc => {
    const med = doc.data();
    const li = document.createElement("li");
    li.textContent = `${med.name} - ₹${med.price}`;
    list.appendChild(li);
  });
});