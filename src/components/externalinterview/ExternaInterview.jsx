import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  TextInput,
  Dropdown,
  Button,
  Label,
  Toast,
  ToastToggle,
} from "flowbite-react";
import {
  HiSearch,
  HiTrash,
  HiPencil,
  HiDotsVertical,
  HiUserAdd,
  HiX,
  HiCheck,
} from "react-icons/hi";

const emptyFormData = {
  Clientcompany: "",
  Scheduledat: "",
  result: "",
  clientfeedback: "",
  proposedcompensation: "",
  offerlettersent: "",
};

const initialData = [
  {
    id: 1,
    Clientcompany: "Company A",
    Scheduledat: "2025-06-01",
    result: "pending",
    clientfeedback: "Good",
    proposedcompensation: "NIL",
    offerlettersent: "YES",
  },
  {
    id: 2,
    Clientcompany: "Company B",
    Scheduledat: "2025-06-02",
    result: "pending",
    clientfeedback: "Good",
    proposedcompensation: "NIL",
    offerlettersent: "YES",
  },
];

const ExternalInterview = () => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setData((prev) => prev.filter((user) => user.id !== deleteTarget.id));
      addToast("Interview has been deleted.", "danger");
      setIsConfirmModalOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row });
    setEditingId(row.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setFormData(emptyFormData);
    setEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();

    if (!formData.Clientcompany || !formData.Scheduledat) {
      addToast("Client Company and Date are required.", "danger");
      return;
    }

    if (editMode && editingId !== null) {
      const updated = data.map((user) =>
        user.id === editingId ? { ...user, ...formData } : user
      );
      setData(updated);
      addToast("Interview details updated.", "success");
    } else {
      const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      const newUser = { id: newId, ...formData };
      setData((prev) => [...prev, newUser]);
      addToast("New interview has been added.", "success");
    }

    handleModalClose();
  };

  const filteredItems = data.filter((item) =>
    [item.Clientcompany, item.Scheduledat]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Interview ID", selector: (row) => row.id, sortable: true },
    { name: "Client Company", selector: (row) => row.Clientcompany, sortable: true },
    { name: "Scheduled At", selector: (row) => row.Scheduledat, sortable: true },
    { name: "Result", selector: (row) => row.result, sortable: true },
    { name: "Client Feedback", selector: (row) => row.clientfeedback },
    { name: "Compensation", selector: (row) => row.proposedcompensation },
    { name: "Offer Letter Sent", selector: (row) => row.offerlettersent },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          inline
          label={<HiDotsVertical className="w-5 h-5 text-gray-600 cursor-pointer" />}
          placement="left-start"
          arrowIcon={false}
        >
          <Dropdown.Item onClick={() => handleEdit(row)}>
            <HiPencil className="w-4 h-4 mr-2" />
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:bg-red-50"
          >
            <HiTrash className="w-4 h-4 mr-2" />
            Delete
          </Dropdown.Item>
        </Dropdown>
      ),
      button: true,
      width: "120px",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "lightblue",
        fontWeight: 600,
      },
    },
    rows: {
      style: {
        backgroundColor: "white",
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm relative">

      {toasts.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
          {toasts.map(({ id, message, type }) => (
            <Toast key={id}>
              <div
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  type === "success"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {type === "success" ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
              </div>
              <div className="ml-3 text-sm font-normal" role="alert">
                {message}
              </div>
              <ToastToggle
                onDismiss={() =>
                  setToasts((prev) => prev.filter((toast) => toast.id !== id))
                }
              />
            </Toast>
          ))}
        </div>
      )}


      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <TextInput
          icon={HiSearch}
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full md:w-64"
        />
        <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">
          External Interview
        </h1>
        <div className="flex gap-2">
          <Dropdown label="Actions" color="light">
            <Dropdown.Item>Export</Dropdown.Item>
            <Dropdown.Item>Import</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown>
          <Button color="blue" onClick={handleAddUser}>
            <HiUserAdd className="mr-2 h-5 w-5" />
            Add Interview
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleModalClose}
          />
          <div className="relative w-full max-w-md h-screen bg-white shadow-lg z-10">
            <div className="p-6 overflow-y-auto h-full">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold">
                  {editMode ? "Edit Interview" : "Add New Interview"}
                </h3>
                <button onClick={handleModalClose}>
                  <HiX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-5">
                {[
                  { id: "Clientcompany", label: "Client Company", type: "text" },
                  { id: "Scheduledat", label: "Scheduled At", type: "date" },
                  { id: "result", label: "Result", type: "text" },
                  { id: "clientfeedback", label: "Client Feedback", type: "text" },
                  { id: "proposedcompensation", label: "Compensation", type: "text" },
                ].map(({ id, label, type }) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id} value={label} />
                    <TextInput
                      id={id}
                      type={type}
                      value={formData[id]}
                      onChange={handleFormChange}
                      required={["Clientcompany", "Scheduledat"].includes(id)}
                    />
                  </div>
                ))}

                
                <div className="space-y-2">
                  <Label htmlFor="offerlettersent" value="Offer Letter Sent" />
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        id="offerlettersent-yes"
                        type="radio"
                        name="offerlettersent"
                        value="YES"
                        checked={formData.offerlettersent === "YES"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            offerlettersent: e.target.value,
                          }))
                        }
                        className="accent-blue-600"
                      />
                      <Label htmlFor="offerlettersent-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="offerlettersent-no"
                        type="radio"
                        name="offerlettersent"
                        value="NO"
                        checked={formData.offerlettersent === "NO"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            offerlettersent: e.target.value,
                          }))
                        }
                        className="accent-blue-600"
                      />
                      <Label htmlFor="offerlettersent-no">No</Label>
                    </div>
                  </div>
                </div>

              
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="submit" color="blue">
                    {editMode ? "Update Interview" : "Save Interview"}
                  </Button>
                  <Button
                    color="gray"
                    type="reset"
                    onClick={() => setFormData(emptyFormData)}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     
      {isConfirmModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="bg-white w-full sm:max-w-md rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-gray-800">
                Are you sure you want to delete the interview with{" "}
                <span className="font-bold">{deleteTarget?.Clientcompany}</span>?
              </p>
              <div className="flex justify-end gap-3">
                <Button color="gray" onClick={() => setIsConfirmModalOpen(false)}>
                  Cancel
                </Button>
                <Button color="failure" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalInterview;
