import {
  Button,
  Label,
  Select,
  TextInput,
  Dropdown,
  Textarea,
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

export function StatusHistoryScreen() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [userid, setUserID] = useState("");
  const [updatedby, setUpdatedBy] = useState("");
  const [updaterrole, setUpdaterRole] = useState("");
  const [previousstatus, setPreviousStatus] = useState("");
  const [newstatus, setNewstatus] = useState("");
  const [updatedat, setUpdatedat] = useState("");
  const [comments, setComments] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      userid: "1",
      updatedby: "Joe",
      updaterrole: "Manager",
      previousstatus: "Active",
      newstatus: "Inactive",
      updatedat: "12:25",
      comments: "Promoted",
    },
    {
      id: 2,
      userid: "2",
      updatedby: "John",
      updaterrole: "Mentor",
      previousstatus: "Pending",
      newstatus: "Active",
      updatedat: "14:50",
      comments: "Approved",
    },
  ]);

  const filteredItems = data.filter((item) =>
    [
      item.userid,
      item.updatedby,
      item.updaterrole,
      item.previousstatus,
      item.newstatus,
      item.updatedat,
      item.comments || "",
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
    setUserID(user.userid);
    setUpdatedBy(user.updatedby);
    setUpdaterRole(user.updaterrole);
    setPreviousStatus(user.previousstatus);
    setNewstatus(user.newstatus);
    setUpdatedat(user.updatedat);
    setComments(user.comments);
    setOpenFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
     
      !userid ||
      !updatedby ||
      !updaterrole ||
      !previousstatus ||
      !newstatus ||
      !updatedat ||
      !comments
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
                userid,
                updatedby,
                updaterrole,
                previousstatus,
                newstatus,
                updatedat,
                comments,
              }
            : user
        )
      );
      toast.success("Status updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        userid,
        updatedby,
        updaterrole,
        previousstatus,
        newstatus,
        updatedat,
        comments,
      };
      setData((prev) => [...prev, newUser]);
      toast.success("Status added successfully.");
    }

    setOpenFormModal(false);
    handleReset();
  };

  const handleReset = () => {
    setUserID("");
    setUpdatedBy("");
    setUpdaterRole("");
    setPreviousStatus("");
    setNewstatus("");
    setUpdatedat("");
    setComments("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  const columns = [

    { name: "User ID", selector: (row) => row.userid, sortable: true },
    { name: "Updated By", selector: (row) => row.updatedby, sortable: true },
    { name: "Updater Role", selector: (row) => row.updaterrole, sortable: true },
    { name: "Previous Status", selector: (row) => row.previousstatus, sortable: true },
    { name: "New Status", selector: (row) => row.newstatus, sortable: true },
    { name: "Updated At", selector: (row) => row.updatedat, sortable: true },
    { name: "Comments", selector: (row) => row.comments, sortable: true },
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
          <div className="bg-white w-full max-w-md h-full shadow-xl transform transition-transform duration-2000 ease-in-out translate-x-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Edit Status" : "+Add Status"}
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
                  <Label htmlFor="userid">User ID</Label>
                  <TextInput id="userid" type="text" value={userid} onChange={(e) => setUserID(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="updatedby">Updated By</Label>
                  <TextInput id="updatedby" type="text" value={updatedby} onChange={(e) => setUpdatedBy(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="updaterrole">Updated Role</Label>
                  <Select id="updaterrole" value={updaterrole} onChange={(e) => setUpdaterRole(e.target.value)}>
                    <option value="">-- Select Role --</option>
                    <option value="Mentor">Mentor</option>
                    <option value="TL">TL</option>
                    <option value="Manager">Manager</option>
                    <option value="System">System</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="previousstatus">Previous Status</Label>
                  <TextInput
                    id="previousstatus"
                    type="text"
                    value={previousstatus}
                    onChange={(e) => setPreviousStatus(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newstatus">New Status</Label>
                  <TextInput id="newstatus" type="text" value={newstatus} onChange={(e) => setNewstatus(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="updatedat">Updated at</Label>
                  <TextInput id="updatedat" type="time" value={updatedat} onChange={(e) => setUpdatedat(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} rows={3} />
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
            placeholder="Search status history..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-64"
          />
          <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">Status History</h1>
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
              +Status
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
                Are you sure you want to delete User ID{" "}
                <span className="font-bold">
                  {data.find((user) => user.id === userToDelete)?.userid || "this user"}
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
