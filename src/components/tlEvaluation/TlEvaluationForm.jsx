import {
    Button,
    Label,
    TextInput,
    Dropdown,
    Modal,
    ModalHeader,
    ModalBody,
    Radio,
} from "flowbite-react";
import {
    HiSearch,
    HiTrash,
    HiPencil,
    HiDotsVertical,
    HiX,
    HiDocumentReport,
} from "react-icons/hi";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
            userId: "",
            tlId: "",
            weeklySummary: "",
            skillRatings: "",
            evalPeriodStart: "",
            evalPeriodEnd: "",
            promotionRecommended: "",   
};

function TlEvaluationForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(initialFormState);
    const [filterText, setFilterText] = useState("");

    const [userIds, setUserIds] = useState([    
        { id: 1, userId: "101" },
        { id: 2, userId: "102" },
        { id: 3, userId: "103" },
    ]);
    const [selectedUserIds, setSelectedUserIds] = useState("");


    const [tlIds, setTlIds] = useState([    
        { id: 1, tlId: "201" },
        { id: 2, tlId: "202" },
        { id: 3, tlId: "203" },
    ]);
    const [selectedTlIds, setSelectedTlIds] = useState("");


    const [data, setData] = useState([
        {
            id:"1",
            userId: "101",
            tlId: "201",
            weeklySummary: "In Progress",
            skillRatings: "5",
            evalPeriodStart: "9:00 AM",
            evalPeriodEnd: "19:30 PM",
            promotionRecommended: "Yes"
        },
    ]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [isPromotion, setIsPromotion] = useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.userId=selectedUserIds;
        form.tlId = selectedTlIds;
        form.promotionRecommended = isPromotion;
        
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
            toast.success("Evaluation updated successfully!");
        } else {
            const newId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
            
            setData((prev) => [...prev, { ...form, id: newId }]);
            toast.success("Evaluation submitted successfully!");
        }

        setForm(initialFormState);
        setSelectedUserIds(" ");
        setSelectedTlIds(" ");
        setIsOpen(false);
    };

    const handleReset = () => {
        setForm(initialFormState);
        setSelectedUserIds(" ");
        setSelectedTlIds(" ");
    };

    const handleDeleteClick = (id) => {
        setSelectedDeleteId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setData((prev) => prev.filter((user) => user.id !== selectedDeleteId));
        setDeleteModalOpen(false);
        setSelectedDeleteId(null);
        toast.success("Evaluation deleted successfully!");
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
        [item.userId, item.tlId, item.weeklySummary, item.skillRatings, item.evalPeriodStart, item.evalPeriodEnd, item.promotionRecommended]
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );

    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true, grow: 0.5, wrap: true,},
        { name: "WEEKLY SUMMARY", selector: (row) => row.weeklySummary, sortable: true },
        { name: "SKILL RATINGS", selector: (row) => row.skillRatings, sortable: true },
        { name: "EVAL PERIOD START", selector: (row) => row.evalPeriodStart, sortable: true },
        { name: "EVAL PERIOD END", selector: (row) => row.evalPeriodEnd, sortable: true },
        { name: "PROMOTION RECOMMENDED", selector: (row) => row.promotionRecommended, sortable: true },
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
                width:"auto"
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
                                <HiDocumentReport className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg font-semibold">
                                    Add TL EVALUATION
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
                                <Label htmlFor="status">Select User Id</Label>
                                <select
                                    value={selectedUserIds}
                                    onChange={(e) => setSelectedUserIds(e.target.value)}
                                    className="border px-4 py-2 rounded w-full"
                                    >
                                    <option value="">-- Select UserIds --</option>
                                    {userIds.map((userIdList) => (
                                    <option key={userIdList.id} value={userIdList.userId}>
                                        {userIdList.userId}
                                    </option>
                                    ))}
                                </select>
                                </div>                            
                                <div>
                                <Label htmlFor="status">Select TL Id</Label>
                                <select
                                    value={selectedTlIds}
                                    onChange={(e) => setSelectedTlIds(e.target.value)}
                                    className="border px-4 py-2 rounded w-full"
                                    >
                                    <option value="">-- Select TLIds --</option>
                                    {tlIds.map((tlIdList) => (
                                    <option key={tlIdList.id} value={tlIdList.tlId}>
                                        {tlIdList.tlId}
                                    </option>
                                    ))}
                                </select>
                                </div>                            
                                <div>
                                <Label htmlFor="weeklySummary">Weekly Summary</Label>
                                <TextInput
                                    id="weeklySummary"
                                    name="weeklySummary"
                                    type="text"
                                    value={form.weeklySummary}
                                    onChange={handleChange}
                                />
                                </div> 
                                <div>
                                <Label htmlFor="skillRatings">Skill Ratings</Label>
                                <TextInput
                                    id="skillRatings"
                                    name="skillRatings"
                                    type="text"
                                    value={form.skillRatings}
                                    onChange={handleChange}
                                />
                                </div>       
                                <div>
                                <Label htmlFor="evalPeriodStart">Evaluation Time Started</Label>
                                <TextInput
                                    id="evalPeriodStart"
                                    name="evalPeriodStart"
                                    type="time"
                                    value={form.evalPeriodStart}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="evalPeriodEnd">Evaluation Time Started</Label>
                                <TextInput
                                    id="evalPeriodEnd"
                                    name="evalPeriodEnd"
                                    type="time"
                                    value={form.evalPeriodEnd}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="promotionRecommended">Promotion Recommended</Label>
                                <div className="flex max-w-md flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <Radio name="isPromotion" 
                                        value="YES"
                                        onChange={(e)=>setIsPromotion(e.target.value)}
                                         />
                                        <Label htmlFor="yes">Yes</Label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Radio  name="isPromotion" 
                                        value="NO"
                                        
                                        onChange={(e)=>setIsPromotion(e.target.value)} />
                                        <Label htmlFor="no">No</Label>
                                    </div>
                                </div>
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


            {/* Evaluation Table */}
            <div className="p-6 bg-white rounded-lg shadow-sm" style={{width:"100%"}} >

                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    {/* Left: Search */}
                    <TextInput
                        icon={HiSearch}
                        placeholder="Search Evaluation..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-64"
                    />

                    {/* Center: Title */}
                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">TL EVALUATION LIST</h1>
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
                            +Add Evaluation
                        </Button>
                    </div>
                </div>

                            
                <DataTable style={{width:"100%"}}
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

export default TlEvaluationForm;
