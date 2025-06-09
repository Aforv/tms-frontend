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

function HourlyTasks() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    starttime: '',
    endtime: '',
    options: '',
    projectcode: '',
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
      description: 'Design UI',
      starttime: '2024-06-01T17:00',
      endtime: '2024-06-01T18:00',
      options: 'Pending',
      projectcode: '001',
    },
    {
      id: 2,
      description: 'Backend Dev',
      starttime: '2024-06-01T18:00',
      endtime: '2024-06-01T19:00',
      options: 'In Progress',
      projectcode: '002',
    },
    {
      id: 3,
      description: 'Testing',
      starttime: '2024-06-01T19:00',
      endtime: '2024-06-01T20:00',
      options: 'Completed',
      projectcode: '003',
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
    const { description, starttime, endtime, options, projectcode } = formData;

    if (!description.trim()) errors.description = 'Description is required';
    if (!starttime) errors.starttime = 'Start time is required';
    if (!endtime) errors.endtime = 'End time is required';

    if (starttime && endtime && new Date(endtime) <= new Date(starttime)) {
      errors.endtime = 'End time must be after start time';
    }

    if (!options) errors.options = 'Status is required';
    if (!projectcode.trim()) errors.projectcode = 'Project code is required';

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
      description: '',
      starttime: '',
      endtime: '',
      options: '',
      projectcode: '',
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
          item.id === editingUserId ? { ...formData, id: editingUserId } : item
        )
      );
      showToast('Task updated successfully', 'success');
    } else {
      const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      setData((prevData) => [...prevData, { ...formData, id: newId }]);
      showToast('Task added successfully', 'success');
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
    [item.description, item.starttime, item.endtime, item.options, item.projectcode]
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const columns = [
    { name: 'Description', selector: (row) => row.description, sortable: true },
    { name: 'Start Time', selector: (row) => row.starttime, sortable: true },
    { name: 'End Time', selector: (row) => row.endtime, sortable: true },
    { name: 'Status', selector: (row) => row.options, sortable: true },
    { name: 'Project Code', selector: (row) => row.projectcode, sortable: true },
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
            className={`transform transition-transform duration-300 ease-in-out ${
              openFormModal ? 'translate-x-0' : 'translate-x-full'
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
                  <Label htmlFor="description">Description</Label>
                  <TextInput
                    id="description"
                    name="description"
                    onChange={handleFormData}
                    value={formData.description}
                  />
                  {formErrors.description && <p className="text-sm text-red-600 mt-1">{formErrors.description}</p>}
                </div>
                <div>
                  <Label htmlFor="starttime">Start Time</Label>
                  <input
                    type="datetime-local"
                    id="starttime"
                    name="starttime"
                    value={formData.starttime}
                    onChange={handleFormData}
                    className="block w-full rounded border-gray-300"
                  />
                  {formErrors.starttime && <p className="text-sm text-red-600 mt-1">{formErrors.starttime}</p>}
                </div>
                <div>
                  <Label htmlFor="endtime">End Time</Label>
                  <input
                    type="datetime-local"
                    id="endtime"
                    name="endtime"
                    value={formData.endtime}
                    onChange={handleFormData}
                    className="block w-full rounded border-gray-300"
                  />
                  {formErrors.endtime && <p className="text-sm text-red-600 mt-1">{formErrors.endtime}</p>}
                </div>
                <div>
                  <Label htmlFor="options">Status</Label>
                  <Select
                    id="options"
                    name="options"
                    value={formData.options}
                    onChange={handleFormData}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </Select>
                  {formErrors.options && <p className="text-sm text-red-600 mt-1">{formErrors.options}</p>}
                </div>
                <div>
                  <Label htmlFor="projectcode">Project Code</Label>
                  <TextInput
                    id="projectcode"
                    name="projectcode"
                    value={formData.projectcode}
                    onChange={handleFormData}
                  />
                  {formErrors.projectcode && <p className="text-sm text-red-600 mt-1">{formErrors.projectcode}</p>}
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
            placeholder="Search tasks..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-64"
          />
          <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">Hourly Task</h1>
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
              + Add Task
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
            className={`bg-white w-full sm:max-w-md rounded-2xl shadow-xl transition-transform duration-[500ms] ease-in-out ${
              openDeleteModal ? 'translate-x-0' : 'translate-x-full'
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

export default HourlyTasks;
