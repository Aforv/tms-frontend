import React, { useState, useEffect } from 'react';
import {
    Button,
    Dropdown,
    Label,
    Select,
    TextInput,
    Modal,
} from 'flowbite-react';
import DataTable from 'react-data-table-component';
import {
    HiSearch,
    HiTrash,
    HiPencil,
    HiDotsVertical,
    HiCheckCircle,
    HiXCircle,
} from 'react-icons/hi';

function Toast({ message, type = 'success', onClose }) {
    const bgColor =
        type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    const Icon = type === 'success' ? HiCheckCircle : HiXCircle;

    return (
        <div
            className={`fixed bottom-5 right-5 flex items-center space-x-2 px-4 py-2 rounded shadow-lg ${bgColor}`}
            role="alert"
        >
            <Icon className="w-6 h-6" />
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 font-bold">×</button>
        </div>
    );
}

function InternalInterview() {
    const [openFormModal, setOpenFormModal] = useState(false);
    const [formData, setFormData] = useState({
        scheduledat: '',
        result: '',
        technicalassessment: '',
        behavioralnotes: '',
        nextstep: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success',
    });
    const [data, setData] = useState([
        {
            id: 1,
            scheduledat: '2024-06-01',
            result: 'Pass',
            technicalassessment: 'Pending',
            behavioralnotes: 'improve',
            nextstep: 'External Interview',
        },
        {
            id: 2,
            scheduledat: '2024-06-01',
            result: 'Pending',
            technicalassessment: 'Pending',
            behavioralnotes: 'improve',
            nextstep: 'External Interview',
        },
        {
            id: 3,
            scheduledat: '2024-06-01',
            result: 'Fail',
            technicalassessment: 'Pending',
            behavioralnotes: 'improve',
            nextstep: 'Gap Filling',
        },
    ]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast((prev) => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const validateForm = () => {
        const errors = {};
        const { scheduledat, result, technicalassessment, behavioralnotes, nextstep } = formData;

        if (!scheduledat) errors.scheduledat = 'Schedule at is required';
        if (!result) errors.result = 'Result is required';
        if (!technicalassessment) errors.technicalassessment = 'Technical assessment is required';
        if (!behavioralnotes) errors.behavioralnotes = 'Behavioral notes are required';
        if (!nextstep) errors.nextstep = 'Next step is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    const handleReset = () => {
        setFormData({
            scheduledat: '',
            result: '',
            technicalassessment: '',
            behavioralnotes: '',
            nextstep: '',
        });
        setFormErrors({});
        setIsEditing(false);
        setEditingUserId(null);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fix form errors.', 'error');
            return;
        }
        if (isEditing) {
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === editingUserId ? { ...formData, id: item.id } : item
                )
            );
            showToast('Task updated successfully!');
        } else {
            const newId = data.length ? Math.max(data.map((item) => item.id)) + 1 : 1;
            setData((prevData) => [...prevData, { ...formData, id: newId }]);
            showToast('Task added successfully!');
        }
        handleReset();
        setOpenFormModal(false);
    };
    const openDeleteConfirmation = (row) => {
        setSelectedTaskToDelete(row);
        setOpenDeleteModal(true);
    };
    const confirmDelete = () => {
        if (selectedTaskToDelete) {
            setData((prev) => prev.filter((item) => item.id !== selectedTaskToDelete.id));
            setOpenDeleteModal(false);
            showToast('Task deleted successfully', 'success');
            setSelectedTaskToDelete(null);
        }
    };
    const handleEdit = (row) => {
        setFormData(row);
        setFormErrors({});
        setIsEditing(true);
        setEditingUserId(row.id);
        setOpenFormModal(true);
    };
    const filteredItems = data.filter((item) =>
        [item.scheduledat, item.result, item.technicalassessment, item.behavioralnotes, item.nextstep]
            .join(' ')
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );
    const columns = [
        { name: 'Schedule Date', selector: (row) => row.scheduledat, sortable: true },
        { name: 'Result', selector: (row) => row.result, sortable: true },
        { name: 'Tech Assessment', selector: (row) => row.technicalassessment, sortable: true },
        { name: 'Behavioral Notes', selector: (row) => row.behavioralnotes, sortable: true },
        { name: 'NextStep', selector: (row) => row.nextstep, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <Dropdown
                    inline
                    label={<HiDotsVertical className="w-5 h-5 text-gray-600 cursor-pointer" />}
                    placement="left-start"
                    arrowIcon={false}
                    className="z-50"
                >
                    <Dropdown.Item onClick={() => handleEdit(row)}>
                        <HiPencil className="w-4 h-4 mr-2" />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openDeleteConfirmation(row)}>
                        <HiTrash className="w-4 h-4 mr-2 text-red-600" />
                        <span className="text-red-600">Delete</span>
                    </Dropdown.Item>
                </Dropdown>
            ),
            button: true,
        },
    ];
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'lightblue',
                borderBottomWidth: '1px',
                borderBottomColor: '#e5e7eb',
                fontWeight: 600,
            },
        },
        headCells: {
            style: {
                fontSize: '14px',
                color: '#111827',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                color: '#374151',
                backgroundColor: 'white',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e7eb',
                padding: '16px',
            },
        },
    };

    return (
        <>
            <Modal show={openFormModal} onClose={() => setOpenFormModal(false)} size="xl" popup>
                <Modal.Body className="overflow-hidden p-0 bg-transparent">
                    <div
                        className={`transform transition-transform duration-300 ease-in-out ${openFormModal ? 'translate-x-0' : 'translate-x-full'
                            } w-full max-w-md h-full fixed right-0 top-0 bg-white shadow-lg z-50 overflow-y-auto`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">
                                    {isEditing ? 'Edit Task' : 'Add Task'}
                                </h3>
                                <button
                                    onClick={() => setOpenFormModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                               
                                    <div>
                                        <Label htmlFor="scheduledat">scheduled At</Label>
                                        <input
                                            type="date"
                                            id="scheduledat"
                                            name="scheduledat"
                                            value={formData.scheduledat}
                                            onChange={handleFormData}
                                            className="block w-full rounded border-gray-300"
                                        />
                                        {formErrors.scheduledat && <p className="text-sm text-red-600 mt-1">{formErrors.scheduledat}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="result">Result</Label>
                                        <Select
                                            id="result"
                                            name="result"
                                            value={formData.result}
                                            onChange={handleFormData}
                                        >
                                            <option value="">Select result</option>
                                            <option value="Pass">Pass</option>
                                            <option value="Fail">Fail</option>
                                            <option value="Pending">Pending</option>

                                        </Select>
                                        {formErrors.result && <p className="text-sm text-red-600 mt-1">{formErrors.result}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="technicalassessment">TechnicalAssessment</Label>
                                        <TextInput
                                            id="technicalassessment"
                                            name="technicalassessment"
                                            onChange={handleFormData}
                                            value={formData.technicalassessment}
                                        />
                                        {formErrors.technicalassessment && <p className="text-sm text-red-600 mt-1">{formErrors.technicalassessment}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="behavioralnotes">BehavioralNotes</Label>
                                        <TextInput
                                            id="behavioralnotes"
                                            name="behavioralnotes"
                                            onChange={handleFormData}
                                            value={formData.behavioralnotes}
                                        />
                                        {formErrors.behavioralnotes && <p className="text-sm text-red-600 mt-1">{formErrors.behavioralnotes}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="nextstep">nextstep</Label>
                                        <Select
                                            id="nextstep"
                                            name="nextstep"
                                            value={formData.nextstep}
                                            onChange={handleFormData}
                                        >
                                            <option value="">Select nextstep</option>
                                            <option value="ExternalInterview">ExternalInterview</option>
                                            <option value="GapFilling">GapFilling</option>


                                        </Select>
                                        {formErrors.nextstep && <p className="text-sm text-red-600 mt-1">{formErrors.nextstep}</p>}
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <Button type="submit" className="bg-blue-600 text-white">
                                            {isEditing ? 'Update Task' : 'Add Task'}
                                        </Button>
                                        <Button color="gray" onClick={handleReset} type="button">
                                            Reset
                                        </Button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <TextInput
                        icon={HiSearch}
                        placeholder="Search interview..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-64"
                    />
                    <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">Internal Interview</h1>
                    <div className="flex items-center gap-3">
                        <div className="min-w-[120px]">
                            <Dropdown label="Actions" color="light" />
                        </div>
                        <Button
                            className="bg-gradient-to-l from-blue-500 to-blue-700 text-white px-0.5 py-0.5 rounded-lg min-w-[120px]"
                            onClick={() => {
                                handleReset();
                                setOpenFormModal(true);
                            }}
                        >
                            + Add Interview
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
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={`bg-white w-full sm:max-w-md rounded-2xl shadow-xl transition-transform duration-[500ms] ease-in-out ${openDeleteModal ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h2>
                            <p className="mb-6 text-gray-800">
                                Are you sure you want to delete the task{' '}
                                <span className="font-bold">{selectedTaskToDelete?.description}</span>?
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

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </>
    );
}



export default InternalInterview