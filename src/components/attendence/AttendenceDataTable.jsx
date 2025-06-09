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
  { id: 1, attendenceDate:"04-06-2025",loginTime:"9:20AM",logoutTime:"19:28PM",totalHours:"9",attendenceStatus:"Early",
        location:"Bengaluru"},
  { id: 2, attendenceDate:"04-06-2025",loginTime:"9:30AM",logoutTime:"19:30PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"},
  { id: 3, attendenceDate:"04-06-2025",loginTime:"9:30AM",logoutTime:"19:32PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"},
  { id: 4, attendenceDate:"04-06-2025",loginTime:"10:00AM",logoutTime:"19:34PM",totalHours:"9",attendenceStatus:"Half Day",
        location:"Bengaluru"},
  { id: 5, attendenceDate:"05-06-2025",loginTime:"9:30AM",logoutTime:"19:30PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"},
  { id: 6, attendenceDate:"05-06-2025",loginTime:"9:45AM",logoutTime:"19:31PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"},
  { id: 7, attendenceDate:"05-06-2025",loginTime:"9:46AM",logoutTime:"19:32PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"},
  { id: 8, attendenceDate:"05-06-2025",loginTime:"9:46AM",logoutTime:"19:33PM",totalHours:"9",attendenceStatus:"On Time",
        location:"Bengaluru"}
];

const AttendenceDataTable = () => {
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
    alert(`Edit user: ${row.id}`);
  };

  const filteredItems = data.filter((item) =>
    [item.attendenceDate, item.loginTime, item.logoutTime, item.totalHours, item.attendenceStatus, item.location]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.attendenceDate,
      sortable: true,
    },
    {
      name: "LOGIN",
      selector: (row) => row.loginTime,
      sortable: true,
    },
    {
      name: "LOGOUT",
      selector: (row) => row.logoutTime,
      sortable: true,
    },
    {
      name: "TOTAL HOURS",
      selector: (row) => row.totalHours,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.attendenceStatus,
      sortable: true,
    },
    {
      name: "LOCATION",
      selector: (row) => row.location,
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
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown>
      </div>

      <DataTable class="hZInOG"
        title={
          <span className="text-lg font-semibold text-gray-800">Attendance List</span>
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

export default AttendenceDataTable;
                                         