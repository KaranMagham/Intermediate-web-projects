import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Edit2, Trash2, Globe } from 'lucide-react';

const Home = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [savedPasswords, setsavedPasswords] = useState(() => {
        const stored = localStorage.getItem("savedPasswords");
        return stored ? JSON.parse(stored) : [];
    });
    const [editIndex, setEditIndex] = useState(null);
    const hasMounted = useRef(false);

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3000/Passwords")
            const data = await req.json();
            setsavedPasswords(data)
            console.log(data)
        } catch (error) {
            console.error("Error fetching passwords:", error)
        }
    }

    useEffect(() => {
        if (!hasMounted.current) {
            getPasswords();
            hasMounted.current = true;
        }
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const handleEdit = (index) => {
        const entry = savedPasswords[index];
        setEditIndex(index);
        setsavedPasswords(prev => prev.filter((_, i) => i !== index));
        setValue("URL", entry.URL);
        setValue("username", entry.Username);
        setValue("password", entry.Password);
    };

    const handleDelete = async (index) => {
        const entryToDelete = savedPasswords[index];
        try {
            const res = await fetch(`http://localhost:3000/Passwords/${entryToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete entry from backend");

            // remove from local state
            setsavedPasswords(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };


    const onSubmit = async (data) => {
        const timestamp = new Date().toISOString();
        const newEntry = {
            SiteURI: data.SiteURI,
            Username: data.Username,
            Password: data.Password,
            time: timestamp,
        };

        if (editIndex !== null) {
            const idToUpdate = savedPasswords[editIndex]._id;
            try {
                const res = await fetch(`http://localhost:3000/Passwords/${idToUpdate}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to update entry");

                getPasswords();
                setEditIndex(null);
            } catch (error) {
                console.error("Error updating entry:", error);
            }
        } else {
            try {
                const res = await fetch("http://localhost:3000/Passwords", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to save entry");

                getPasswords();
            } catch (error) {
                console.error("Error saving entry:", error);
            }
        }

        reset();
    };



    return (
        <div className="min-h-fit flex justify-center items-center px-4 py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-3xl bg-[#111827] px-6 py-6 sm:px-8 sm:py-8 rounded-xl shadow-2xl border border-yellow-600 flex flex-col gap-6"
            >
                <h2 className="text-center text-yellow-400 text-xl sm:text-2xl font-bold">
                    Add New Entry
                </h2>

                {/* Site Name */}
                <div>
                    <input
                        type="text"
                        autoComplete="url"
                        placeholder="Website / App Name"
                        {...register("SiteURI", { required: "This field is required." })}
                        className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                    />
                    {errors.URL && (
                        <p className="text-yellow-400 text-sm mt-1">{errors.URL.message}</p>
                    )}
                </div>

                {/* Username & Password */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <input
                            type="text"
                            autoComplete="username"
                            placeholder="Username / Email"
                            {...register("Username", { required: "This field is required." })}
                            className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                        />
                        {errors.username && (
                            <p className="text-yellow-400 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="w-full relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter Password"
                            {...register("Password", { required: "This field is required." })}
                            className="bg-[#3d2b1f] w-full p-3 pr-10 rounded text-white placeholder:text-yellow-100"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-yellow-200 hover:text-yellow-400 transition"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.password && (
                            <p className="text-yellow-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-600 cursor-pointer hover:underline hover:bg-yellow-700 transition text-black font-bold py-2 px-6 rounded"
                    >
                        Save Entry
                    </button>
                </div>

                {/* Saved Entries */}
                {savedPasswords.length > 0 && (
                    <div className="w-full rounded-xl border border-yellow-600 p-4 sm:p-6 space-y-4">
                        <h2 className="text-center text-yellow-400 text-xl font-bold">
                            Saved Passwords ({savedPasswords.length})
                        </h2>

                        {savedPasswords.map((entry, index) => (
                            <div key={entry._id} className="p-4 rounded-lg border border-yellow-600 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Globe className="text-yellow-400" size={16} />
                                            <h4 className="text-yellow-400 font-semibold text-base sm:text-lg">
                                                {entry.URL}
                                            </h4>
                                        </div>
                                        <p className="text-gray-300">
                                            <span className="text-yellow-200">Username:</span> {entry.Username}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="text-yellow-200">Password:</span>
                                            <span className="ml-2 font-mono bg-gray-800 px-2 py-1 rounded">
                                                {"•".repeat(entry.Password?.length)}
                                            </span>
                                        </p>
                                        <p className="text-gray-500 text-xs sm:text-sm">
                                            Added: {new Date(entry.time).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-green-600 hover:bg-green-700 transition text-white p-2 rounded"
                                            title="Edit entry"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-600 hover:bg-red-700 transition text-white p-2 rounded"
                                            title="Delete entry"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Entries */}
                {savedPasswords.length === 0 && (
                    <div className="w-full p-6 text-center rounded-xl border border-yellow-600">
                        <p className="text-yellow-400 text-lg">
                            No saved passwords yet. Add your first entry above!
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Home;
