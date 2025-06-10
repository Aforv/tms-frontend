import {
    Button,
    Label,
    TextInput,
    Dropdown,
    Modal,
    ModalHeader,
    ModalBody,
} from "flowbite-react";
import {
    HiBookOpen,
    HiSearch,
    HiTrash,
    HiPencil,
    HiDotsVertical,
    HiX,
    HiOutlineExclamationCircle,
} from "react-icons/hi";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component"
const initialFormState = {
    attendenceDate: "",
    loginTime: "",
    logoutTime: "",
    totalHours: "",
    attendenceStatus: "",
    location: "",
};

function AttendanceForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(initialFormState);
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([
        {
            id: "1",
            attendenceDate: "2025-06-04",
            loginTime: "9:20 AM",
            logoutTime: "19:28 PM",
            totalHours: "9",
            attendenceStatus: "Early",
            location: "Bengaluru",
        },
    ]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = Object.entries(form);
        for (const [key, value] of fields) {
            if (!value) {
                toast.error("Please fill all the fields");
                return;
            }
        }

        if (form.id) {
            setData((prev) =>
                prev.map((item) => (item.id === form.id ? { ...form } : item))
            );
            toast.success("Attendance updated successfully!");
        } else {
            const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
            setData((prev) => [...prev, { ...form, id: newId }]);
            toast.success("Attendance submitted successfully!");
        }

        setForm(initialFormState);
        setIsOpen(false);
    };

    const handleReset = () => {
        setForm(initialFormState);
    };

    const handleDeleteClick = (id) => {
        setSelectedDeleteId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setData((prev) => prev.filter((user) => user.id !== selectedDeleteId));
        setDeleteModalOpen(false);
        setSelectedDeleteId(null);
        toast.success("Attendance deleted successfully!");
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setSelectedDeleteId(null);
    };

    const handleEdit = (row) => {
        setForm({ ...row });
        setIsOpen(true);
    };

    const filteredItems = data.filter((item) =>
        [item.attendenceDate, item.loginTime, item.logoutTime, item.totalHours, item.attendenceStatus, item.location]
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );

    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "DATE", selector: (row) => row.attendenceDate, sortable: true },
        { name: "LOGIN", selector: (row) => row.loginTime, sortable: true },
        { name: "LOGOUT", selector: (row) => row.logoutTime, sortable: true },
        { name: "TOTAL HOURS", selector: (row) => row.totalHours, sortable: true },
        { name: "STATUS", selector: (row) => row.attendenceStatus, sortable: true },
        { name: "LOCATION", selector: (row) => row.location, sortable: true },
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
                        <HiPencil className="h-4 w-4" />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteClick(row.id)}>
                        <HiTrash className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Delete</span>
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
                backgroundColor: "lightblue",
                borderBottomWidth: "1px",
                fontWeight: 600,
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                color: "#111827",
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
        <div>
            <ToastContainer position="top-center" autoClose={3000} />

            {/* Sliding Modal */}
            <Modal show={isOpen} size="sm" onClose={() => setIsOpen(false)} popup>
                <div className="fixed inset-0 z-50 flex justify-end items-start">
                    <div className="relative w-full max-w-sm h-screen bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 translate-x-0">
                        <div className="relative mb-6">
                            <div className="flex items-center gap-2">
                                <HiBookOpen className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg font-semibold">
                                    Add Attendance
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-0 right-0 text-gray-500 hover:text-gray-800"
                                aria-label="Close modal"
                            >
                                <HiX className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="dateId">Enter Date</Label>
                                <TextInput
                                    type="date"
                                    id="dateId"
                                    name="attendenceDate"
                                    value={form.attendenceDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="loginTime">Login Time</Label>
                                <TextInput
                                    id="loginTime"
                                    name="loginTime"
                                    type="time"
                                    value={form.loginTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="logoutTime">Logout Time</Label>
                                <TextInput
                                    id="logoutTime"
                                    name="logoutTime"
                                    type="time"
                                    value={form.logoutTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="totalHours">Total Hours</Label>
                                <TextInput
                                    id="totalHours"
                                    name="totalHours"
                                    type="number"
                                    value={form.totalHours}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Select Status</Label>
                                <select
                                    id="status"
                                    name="attendenceStatus"
                                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                                    value={form.attendenceStatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="On Time">On Time</option>
                                    <option value="Early">Early</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Half Day">Half Day</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <TextInput
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    type="text"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex space-x-3">
                                <Button type="submit" className="bg-blue-600 text-white">
                                    Submit
                                </Button>
                                <Button color="gray" onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModalOpen} size="md" onClose={cancelDelete} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" /> */}
                        <h3 className="mb-5 text-lg font-bold text-gray-500">
                            Are you sure you want to delete this record id {' '} <span >{selectedDeleteId}</span>?

                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={confirmDelete}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={cancelDelete}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


            {/* Attendance Table */}
            <div className="p-6 bg-white rounded-lg shadow-sm" >

                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    {/* Left: Search */}
                    <TextInput
                        icon={HiSearch}
                        placeholder="Search attendance..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-64"
                    />

                    {/* Center: Title */}
                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">Attendance List</h1>
                    </div>

                    {/* Right: Actions + Add Button */}
                    <div className="flex items-center gap-2">
                        <Dropdown label="Actions" color="light">
                            <Dropdown.Item>Import</Dropdown.Item>
                            <Dropdown.Item>Export</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>

                        <Button
                            onClick={() => {
                                setForm(initialFormState);
                                setIsOpen(true);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-0.5 py-0.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            +Add Attendance
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
        </div>
    );
}

export default AttendanceForm;
