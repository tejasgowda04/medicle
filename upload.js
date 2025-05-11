const storage = firebase.storage();
function uploadPrescription() {
  const file = document.getElementById("prescription").files[0];
  const ref = storage.ref("prescriptions/" + Date.now() + "_" + file.name);
  ref.put(file).then(() => alert("Uploaded!"));
}