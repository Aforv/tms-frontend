import {
  Button,
  Label,
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
  HiStar,
} from "react-icons/hi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function MentorReviewScreen() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [rating, setRating] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [improvementsneeded, setImprovementNeeded] = useState("");
  const [reviewdate, setReviewDate] = useState("");
  const [requiressubmission, setRequiresSubmission] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      rating: 4,
      strengths: "Clear communicator",
      improvementsneeded: "More real-world examples",
      reviewdate: "2025-06-11",
      requiressubmission: "Yes",
    },
    {
      id: 2,
      rating: 5,
      strengths: "Strong technical knowledge",
      improvementsneeded: "Add more Q&A sessions",
      reviewdate: "2025-06-11",
      requiressubmission: "Yes",
    },
  ]);

  const filteredItems = data.filter((item) =>
    [
      item.rating,
      item.strengths,
      item.improvementsneeded,
      item.reviewdate,
      item.requiressubmission,
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
    toast.error("Mentor Review deleted.");
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setRating(user.rating);
    setStrengths(user.strengths);
    setImprovementNeeded(user.improvementsneeded);
    setReviewDate(user.reviewdate);
    setRequiresSubmission(user.requiressubmission);
    setOpenFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !rating ||
      !strengths ||
      !improvementsneeded ||
      !reviewdate ||
      !requiressubmission
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
                rating,
                strengths,
                improvementsneeded,
                reviewdate,
                requiressubmission,
              }
            : user
        )
      );
      toast.success("Mentor Review updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        rating,
        strengths,
        improvementsneeded,
        reviewdate,
        requiressubmission,
      };
      setData((prev) => [...prev, newUser]);
      toast.success("Mentor Review added successfully.");
    }

    setOpenFormModal(false);
    handleReset();
  };

  const handleReset = () => {
    setRating(0);
    setStrengths("");
    setImprovementNeeded("");
    setReviewDate("");
    setRequiresSubmission("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  const renderStars = (value) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <HiStar
            key={i}
            className={`w-5 h-5 ${
              i <= value ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const columns = [
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      cell: (row) => renderStars(row.rating),
    },
    {
      name: "Strengths",
      selector: (row) => row.strengths,
      sortable: true,
    },
    {
      name: "Improvements Needed",
      selector: (row) => row.improvementsneeded,
      sortable: true,
    },
    {
      name: "Review Date",
      selector: (row) => row.reviewdate,
      sortable: true,
    },
    {
      name: "Requires Submission",
      selector: (row) => row.requiressubmission,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          inline
          placement="left"
          arrowIcon={false}
          label={
            <HiDotsVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
          }
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

      {/* Form Modal */}
      {openFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Edit Mentor Review" : "Mentor Review"}
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
                  <Label htmlFor="ratings">Rating</Label>
                  <div className="flex items-center space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <HiStar
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-6 h-6 cursor-pointer ${
                          rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        aria-label={`${star} Star`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="strength">Strengths</Label>
                  <TextInput
                    id="strength"
                    type="text"
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="improvement">Improvements</Label>
                  <TextInput
                    id="improvement"
                    type="text"
                    value={improvementsneeded}
                    onChange={(e) => setImprovementNeeded(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reviewdate">Review Date</Label>
                  <TextInput
                    id="reviewdate"
                    type="date"
                    value={reviewdate}
                    onChange={(e) => setReviewDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="submission">Submission</Label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="submission"
                        value="Yes"
                        checked={requiressubmission === "Yes"}
                        onChange={(e) =>
                          setRequiresSubmission(e.target.value)
                        }
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="submission"
                        value="No"
                        checked={requiressubmission === "No"}
                        onChange={(e) =>
                          setRequiresSubmission(e.target.value)
                        }
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-l from-blue-500 to-blue-700 text-white"
                  >
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

      {/* Page Header & Table */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <TextInput
            icon={HiSearch}
            placeholder="Search Mentor Review..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-64"
          />
          <h1 className="text-xl font-bold text-blue-900 flex-1 text-center">
            Mentor Review
          </h1>
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
              + Mentor Review
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

      {/* Delete Confirmation Modal */}
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
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-gray-800">
                Are you sure you want to delete{" "}
                <span className="font-bold">
                  {data.find((user) => user.id === userToDelete)?.strengths ||
                    "this review"}
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
