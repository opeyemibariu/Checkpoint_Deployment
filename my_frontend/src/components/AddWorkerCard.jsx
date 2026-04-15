import { useState } from "react";

export default function AddWorkerCard({ setMonitor }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWorker = {
      ...form,
      status: "active",
      createdAt: new Date().toISOString()
    };

    fetch('api/workers', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newWorker)})
    .then(res => res.json())
    .then(() => setMonitor(prev => !prev))

    setOpen(false);
    setForm({
      name: "",
      role: "",
      email: "",
      phone: "",
      address: ""
    });
  };

  return (
    <>
      {/* CARD */}
      <div style={styles.card} onClick={() => setOpen(true)}>
        <div style={styles.plus}>+</div>
      </div>

      {/* MODAL */}
      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Add Worker</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input name="name" placeholder="Name" onChange={handleChange} required />
              <input name="role" placeholder="Role" onChange={handleChange} required />
              <input name="email" placeholder="Email" onChange={handleChange} required />
              <input name="phone" placeholder="Phone" onChange={handleChange} required />
              <input name="address" placeholder="Address" onChange={handleChange} />

              <div style={styles.actions}>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  card: {
    width: "250px",
    height: "160px",
    border: "2px dashed #aaa",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "#fafafa"
  },
  plus: {
    fontSize: "48px",
    color: "#555"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  }
};