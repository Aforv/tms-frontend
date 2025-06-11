import {
  Button,
  Label,
  Select,
  TextInput,
  Dropdown,
} from "flowbite-react";
import DataTable from "react-data-table-component";
import {
  HiSearch,
  HiTrash,
  HiPencil,
  HiDotsVertical,
  HiX,
} from "react-icons/hi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function HrProcessScreen() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [stage, setStage] = useState("");
  const [offerdate, setOfferDate] = useState("");
  const [finalsalary, setFinalSalary] = useState("");
  const [benefitspackage, setBenefitsPackage] = useState("");
  const [completed, setCompleted] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      stage: "Offer Letter",
      offerdate: "2025-06-11",
      finalsalary: "50000",
      benefitspackage: "Standard",
      completed: "Yes",
    },
    {
      id: 2,
      stage: "Onboarding",
      offerdate: "2025-06-10",
      finalsalary: "60000",
      benefitspackage: "Premium",
      completed: "No",
    },
  ]);

  const filteredItems = data.filter((item) =>
    [
      item.stage,
      item.offerdate,
      item.finalsalary,
      item.benefitspackage,
      item.completed,
    ]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const handleDelete = (id) => {
    setUserToDelete(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    setData((prev) => prev.filter((user) => user.id !== userToDelete));
    setOpenDeleteModal(false);
    setUserToDelete(null);
    toast.error("Status deleted.");
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setStage(user.stage);
    setOfferDate(user.offerdate);
    setFinalSalary(user.finalsalary);
    setBenefitsPackage(user.benefitspackage);
    setCompleted(user.completed);
    setOpenFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !stage ||
      !offerdate ||
      !finalsalary ||
      !benefitspackage ||
      !completed
    ) {
      toast.warning("Please fill all required fields.");
      return;
    }

    if (isEditing) {
      setData((prev) =>
        prev.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                stage,
                offerdate,
                finalsalary,
                benefitspackage,
                completed,
              }
            : user
        )
      );
      toast.success("Status updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        stage,
        offerdate,
        finalsalary,
        benefitspackage,
        completed,
      };
      setData((prev) => [...prev, newUser]);
      toast.success("Status added successfully.");
    }

    setOpenFormModal(false);
    handleReset();
  };

  const handleReset = () => {
    setStage("");
    setOfferDate("");
    setFinalSalary("");
    setBenefitsPackage("");
    setCompleted("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  const columns = [
    { name: "Stage", selector: (row) => row.stage, sortable: true },
    { name: "Offer Date", selector: (row) => row.offerdate, sortable: true },
    { name: "Final Salary", selector: (row) => row.finalsalary, sortable: true },
    { name: "Benefit Package", selector: (row) => row.benefitspackage, sortable: true },
    { name: "Completed", selector: (row) => row.completed, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          inline
          placement="left"
          arrowIcon={false}
          label={<HiDotsVertical className="w-5 h-5 text-gray-600 cursor-pointer" />}
        >
          <Dropdown.Item onClick={() => handleEdit(row)}>
            <HiPencil className="w-4 h-4 mr-1" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDelete(row.id)}>
            <HiTrash className="w-4 h-4 mr-1 text-red-500" /> Delete
          </Dropdown.Item>
        </Dropdown>
      ),
      button: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "lightblue",
        borderBottomWidth: "1px",
        fontWeight: 600,
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        color: "#111827",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "white",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #e5e7eb",
        padding: "16px",
      },
    },
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {openFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Edit HR Process" : "+ HR Process"}
              </h3>
              <button
                onClick={() => {
                  setOpenFormModal(false);
                  handleReset();
                }}
              >
                <HiX className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select id="stage" value={stage} onChange={(e) => setStage(e.target.value)}>
                    <option value="">-- Select Stage --</option>
                    <option value="Offer Letter">Offer Letter</option>
                    <option value="Background Check">Background Check</option>
                    <option value="Onboarding">Onboarding</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="offerdate">Offer Date</Label>
                  <TextInput
                    id="offerdate"
                    type="date"
                    value={offerdate}
                    onChange={(e) => setOfferDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="finalsalary">Final Salary</Label>
                  <TextInput
                    id="finalsalary"
                    type="number"
                    value={finalsalary}
                    onChange={(e) => setFinalSalary(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="benefitspackage">Benefits Package</Label>
                  <TextInput
                    id="benefitspackage"
                    type="text"
                    value={benefitspackage}
                    onChange={(e) => setBenefitsPackage(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="completed">Completed</Label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="completed"
                        value="Yes"
                        checked={completed === "Yes"}
                        onChange={(e) => setCompleted(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="completed"
                        value="No"
                        checked={completed === "No"}
                        onChange={(e) => setCompleted(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="bg-gradient-to-l from-blue-500 to-blue-700 text-white">
                    {isEditing ? "Update" : "Submit"}
                  </Button>
                  <Button type="button" color="gray" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <TextInput
            icon={HiSearch}
            placeholder="Search HR process..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-64"
          />
          <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">HR Process</h1>
          <div className="flex items-center gap-3">
            <Dropdown label="Actions" color="light">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Import</Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown>
            <Button
              onClick={() => {
                handleReset();
                setOpenFormModal(true);
              }}
              className="bg-gradient-to-l from-blue-500 to-blue-700 text-white"
            >
              +HR Process
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
          noDataComponent={
            <div className="py-4 text-gray-500 text-sm text-center">
              No records to display.
            </div>
          }
        />
      </div>

      {openDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setOpenDeleteModal(false)}
        >
          <div
            className="bg-white w-full rounded-2xl sm:max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h2>
              <p className="mb-6 text-gray-800">
                Are you sure you want to delete{" "}
                <span className="font-bold">
                  {data.find((user) => user.id === userToDelete)?.stage || "this record"}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
