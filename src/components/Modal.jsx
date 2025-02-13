import { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        referrerName: "",
        referrerEmail: "",
        refereeName: "",
        refereeEmail: "",
        courseLink: ""
    });

    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.referrerName.trim()) newErrors.referrerName = "Your name is required";
        if (!formData.referrerEmail.trim()) {
            newErrors.referrerEmail = "Your email is required";
        } else if (!emailRegex.test(formData.referrerEmail)) {
            newErrors.referrerEmail = "Enter a valid email address";
        }

        if (!formData.refereeName.trim()) newErrors.refereeName = "Referee name is required";
        if (!formData.refereeEmail.trim()) {
            newErrors.refereeEmail = "Referee email is required";
        } else if (!emailRegex.test(formData.refereeEmail)) {
            newErrors.refereeEmail = "Enter a valid email address";
        }

        if (!formData.courseLink.trim()) newErrors.courseLink = "Course link is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await axios.post("http://localhost:3000/add-referal", formData)

        if (result?.data?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Referal Sent Sucessfully",
                showConfirmButton: false,
                timer: 1500
            });
            setFormData({
                referrerName: "",
                referrerEmail: "",
                refereeName: "",
                refereeEmail: "",
                courseLink: ""
            });
            setErrors({});
            onClose();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Send Referral to a Friend</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {[
                        { label: "Your Name", name: "referrerName", type: "text" },
                        { label: "Your Email", name: "referrerEmail", type: "email" },
                        { label: "Referee Name", name: "refereeName", type: "text" },
                        { label: "Referee Email", name: "refereeEmail", type: "email" },
                        { label: "Course Link", name: "courseLink", type: "url" }
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-medium mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                value={formData[name]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Send Referral
                    </button>
                </form>

                <button
                    className="w-full mt-3 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;
