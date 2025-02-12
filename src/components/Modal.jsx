import { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const reset = () => {
            setEmail("");
            setCourse("");
            setErrors({});
            onClose();
        }

        let newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required";
        if (!course.trim()) newErrors.course = "Course name is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }



        reset()

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Send Referral to a Friend</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your friend's email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Course Name</label>
                        <input
                            type="text"
                            placeholder="Enter course name"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                    </div>

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
