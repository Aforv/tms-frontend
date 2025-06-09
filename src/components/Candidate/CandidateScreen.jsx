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

export function CandidateScreen() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [regdate, setRegdate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      regdate: "2024-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "In Progress",
      regdate: "2024-02-15",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Editor",
      status: "On Hold",
      regdate: "2024-03-10",
    },
  ]);

  const filteredItems = data.filter((item) =>
    [item.name, item.email, item.role]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    setData((prev) => prev.filter((user) => user.id !== userToDelete));
    setOpenDeleteModal(false);
    setUserToDelete(null);
    toast.error("User has been deleted.");
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status || "");
    setRegdate(user.regdate || "");
    setOpenFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !role || !status || !regdate) {
      toast.warning("Please fill all required fields.");
      return;
    }

    if (isEditing) {
      setData((prev) =>
        prev.map((user) =>
          user.id === editingUserId
            ? { ...user, name, email, role, status, regdate }
            : user
        )
      );
      toast.success("User updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role,
        status,
        regdate,
      };
      setData((prev) => [...prev, newUser]);
      toast.success("User added successfully.");
    }

    setOpenFormModal(false);
    handleReset();
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setRole("");
    setStatus("");
    setRegdate("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "RegDate", selector: (row) => row.regdate, sortable: true },
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
      width: "130px",
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
          <div className="bg-white w-full max-w-md h-full shadow-xl transform transition-transform duration-700 ease-in-out translate-x-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Edit Candidate/Employee" : "+Add Candidate/Employee"}
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
                  <Label htmlFor="name">Name</Label>
                  <TextInput id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">-- Select Role --</option>
                    <option value="Employer">Employer</option>
                    <option value="Candidate">Candidate</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">-- Select Status --</option>
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Terminated">Terminated</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="regdate">Registration Date</Label>
                  <TextInput
                    id="regdate"
                    type="date"
                    value={regdate}
                    onChange={(e) => setRegdate(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="bg-gradient-to-l from-blue-500 to-blue-700 text-white">
                    {isEditing ? "Update" : "Submit"}
                  </Button>
                  <Button color="gray" onClick={(e) => { e.preventDefault(); handleReset(); }}>
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
            placeholder="Search users..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-64"
          />
          <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">User List</h1>
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
              +Add Candidate/Employee
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
      </div>


      {openDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setOpenDeleteModal(false)}
        >
          <div
            className="bg-white w-full rounded-2xl sm:max-w-md shadow-xl transform transition-all duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h2>
              <p className="mb-6 text-gray-800">
                Are you sure you want to delete{" "}
                <span className="font-bold">
                  {data.find((user) => user.id === userToDelete)?.name || "this user"}
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
