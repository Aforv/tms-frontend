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
    HiSearch,
    HiTrash,
    HiPencil,
    HiDotsVertical,
    HiX,
    HiDocumentReport,
    HiPuzzle,
} from "react-icons/hi";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
    userId: "",
    identifiedGaps: "",
    trainingPlan: "",
    startDate: "",
    targetCompletionDate: "",
    gapFillStatus: "",
    retryAttempt: "",
};

function GapFillingForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(initialFormState);
    const [filterText, setFilterText] = useState("");

    const [userIds, setUserIds] = useState([
        { id: 1, userId: "101" },
        { id: 2, userId: "102" },
        { id: 3, userId: "103" },
    ]);
    const [selectedUserIds, setSelectedUserIds] = useState("");

    const [data, setData] = useState([
        {
            id: "1",
            userId: "101",
            identifiedGaps: "2",
            trainingPlan: "Intermediate",
            startDate: "10-06-2025",
            targetCompletionDate: "11-06-2025",
            gapFillStatus: "InProgress",
            retryAttempt: 1,
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
        form.userId=selectedUserIds;
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
            toast.success("GapFilling Data updated successfully!");
        } else {
            const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;

            setData((prev) => [...prev, { ...form, id: newId }]);
            toast.success("GapFilling Data submitted successfully!");
        }

        setForm(initialFormState);
        setSelectedUserIds(" ");
        setIsOpen(false);
    };

    const handleReset = () => {
        setForm(initialFormState);
        setSelectedUserIds(" ");
    };

    const handleDeleteClick = (id) => {
        setSelectedDeleteId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setData((prev) => prev.filter((user) => user.id !== selectedDeleteId));
        setDeleteModalOpen(false);
        setSelectedDeleteId(null);
        toast.success("Data deleted successfully!");
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
        [item.userId, item.identifiedGaps, item.trainingPlan, item.startDate, item.targetCompletionDate, item.gapFillStatus, item.retryAttempt]
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );

    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true, grow: 0.5, wrap: true, },
        { name: "IDENTIFIED GAPS", selector: (row) => row.identifiedGaps, sortable: true },
        { name: "TRAINING PLAN", selector: (row) => row.trainingPlan, sortable: true },
        { name: "START DATE", selector: (row) => row.startDate, sortable: true },
        { name: "COMPLETION DATE", selector: (row) => row.targetCompletionDate, sortable: true },
        { name: "STATUS", selector: (row) => row.gapFillStatus, sortable: true },
        { name: "RETRY ATTEMPT", selector: (row) => row.retryAttempt, sortable: true },
        {
            name: "ACTIONS",
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
                width: "auto"
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
                                <HiPuzzle className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg font-semibold">
                                    Add  Gap Filling Details
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
                                <Label htmlFor="userId">Select User ID</Label>
                                <select
                                    id="userId"
                                    name="userId"
                                    value={selectedUserIds}
                                    onChange={(e) => setSelectedUserIds(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm"
                                    
                                >
                                    <option value="">-- Select User ID --</option>
                                    {userIds.map((user) => (
                                        <option key={user.id} value={user.userId}>
                                            {user.userId}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>
                                <Label htmlFor="identifiedGaps">Identified Gaps</Label>
                                <TextInput
                                    id="identifiedGaps"
                                    name="identifiedGaps"
                                    type="text"
                                    value={form.identifiedGaps}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div>
                                <Label htmlFor="trainingPlan">Training Plan</Label>
                                <TextInput
                                    id="trainingPlan"
                                    name="trainingPlan"
                                    type="text"
                                    value={form.trainingPlan}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div>
                                <Label htmlFor="startDate">Start Date</Label>
                                <TextInput
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={form.startDate}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div>
                                <Label htmlFor="targetCompletionDate">Target Completion Date</Label>
                                <TextInput
                                    id="targetCompletionDate"
                                    name="targetCompletionDate"
                                    type="date"
                                    value={form.targetCompletionDate}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                            <div>
                                <Label htmlFor="gapFillStatus">Select Status</Label>
                                <select
                                    id="gapFillStatus"
                                    name="gapFillStatus"
                                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                                    value={form.gapFillStatus}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select Status</option> {/* Default option */}
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Extended">Extended</option>
                                </select>
                            </div>


                            <div>
                                <Label htmlFor="retryAttempt">Retry attempt</Label>
                                <TextInput
                                    id="retryAttempt"
                                    name="retryAttempt"
                                    type="text"
                                    value={form.retryAttempt}
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


            {/* Gap Filling Table */}
            <div className="p-6 bg-white rounded-lg shadow-sm" style={{ width: "100%" }} >

                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    {/* Left: Search */}
                    <TextInput
                        icon={HiSearch}
                        placeholder="Search Gap filling..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-64"
                    />

                    {/* Center: Title */}
                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">Gap Filling List</h1>
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
                            +Add Gap Filling Details
                        </Button>
                    </div>
                </div>

                            
                <DataTable style={{ width: "100%" }}
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

export default GapFillingForm;
