import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { TextInput, Dropdown } from "flowbite-react";
import {
  HiSearch,
  HiTrash,
  HiPencil,
  HiDotsVertical,
} from "react-icons/hi";

// import "./DataTableWithFlowbite.css"

// Sample data
const initialData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Viewer" },
  { id: 5, name: "Eve Adams", email: "eve@example.com", role: "Admin" },
  { id: 6, name: "David Lee", email: "david@example.com", role: "User" },
  { id: 7, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 8, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 9, name: "Alice Johnson", email: "alice@example.com", role: "Editor" },
  { id: 10, name: "Bob Brown", email: "bob@example.com", role: "Viewer" },
  { id: 11, name: "Eve Adams", email: "eve@example.com", role: "Admin" },
  { id: 12, name: "David Lee", email: "david@example.com", role: "User" },
];

const DataTableWithMenu = () => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState(initialData);

  const handleDelete = (rowId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setData((prev) => prev.filter((user) => user.id !== rowId));
    }
  };

  const handleEdit = (row) => {
    alert(`Edit user: ${row.name}`);
  };

  const filteredItems = data.filter((item) =>
    [item.name, item.email, item.role]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          inline
          label={
            <HiDotsVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
          }
          placement="left-start"
          arrowIcon={false}
        >
          <Dropdown.Item
            onClick={() => handleEdit(row)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <HiPencil className="w-15 h-4" />
            <span>Edit</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleDelete(row.id)}
            className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50"
          >
            <HiTrash className="w-15 h-4" />
            <span>Delete</span>
          </Dropdown.Item>
        </Dropdown>
      ),
      button: true,
      width: "100px",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        // backgroundColor: "#f9fafb",
        backgroundColor: "lightblue",
        borderBottomWidth: "1px",
        borderBottomColor: "#e5e7eb",
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
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <TextInput
          icon={HiSearch}
          placeholder="Search users..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-64"
        />
        <Dropdown label="Actions" color="light">
          <Dropdown.Item>Export</Dropdown.Item>
          <Dropdown.Item>Import</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown>
      </div>

      <DataTable class="hZInOG"
        title={
          <span className="text-lg font-semibold text-gray-800">User List</span>
        }
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
  );
};

export default DataTableWithMenu;
