import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Edit2, Trash2, Globe } from 'lucide-react';

const Home = () => {
    const [showNote, setShowNote] = useState(false);
    const [savedNotes, setsavedNotes] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const hasMounted = useRef(false);

    const getNotes = async () => {
        try {
            let req = await fetch("http://localhost:7000/Notes")
            const data = await req.json();
            setsavedNotes(data)
            console.log(data)
        } catch (error) {
            console.error("Error fetching passwords:", error)
        }
    }

    useEffect(() => {
        if (!hasMounted.current) {
            getNotes();
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
        const entry = savedNotes[index];
        setEditIndex(index);
        setsavedNotes(prev => prev.filter((_, i) => i !== index));
        setValue("title", entry.title);
        setValue("content", entry.content);
        setValue("priority", entry.priority);
    };

    const handleDelete = async (index) => {
        const entryToDelete = savedNotes[index];
        try {
            const res = await fetch(`http://localhost:7000/Notes/${entryToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete entry from backend");

            setsavedNotes(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const onSubmit = async (data) => {
        const timestamp = new Date().toISOString();
        const newEntry = {
            title: data.title,
            content: data.content,
            priority: data.priority,
            time: timestamp,
        };

        if (editIndex !== null) {
            const idToUpdate = savedNotes[editIndex]._id;
            try {
                const res = await fetch(`http://localhost:7000/Notes/${idToUpdate}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to update entry");

                getNotes();
                setEditIndex(null);
            } catch (error) {
                console.error("Error updating entry:", error);
            }
        } else {
            try {
                const res = await fetch("http://localhost:7000/Notes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to save entry");

                getNotes();
            } catch (error) {
                console.error("Error saving entry:", error);
            }
        }

        reset();
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl bg-[#2B2950] px-6 py-6 sm:px-8 sm:py-8 rounded-xl shadow-2xl border border-[#FBBF24] flex flex-col gap-6">
                    <h2 className="text-center text-[#FBBF24] text-xl sm:text-2xl font-bold">
                        Add New Notes
                    </h2>

                    <div>
                        {/* Notes Title */}
                        <div className='mb-2'>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Note Title"
                                {...register("title", { required: "This field is required." })}
                                className="bg-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#FBBF24] w-full p-3 rounded text-white placeholder:text-yellow-100"
                            />
                            {errors.title && (
                                <p className="text-yellow-400 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Content / Note */}
                        <div className="flex flex-col gap-4 mb-2">
                            <div className="w-full">
                                <textarea
                                    rows={5}
                                    autoComplete="off"
                                    placeholder="Content / Note"
                                    {...register("content", { required: "This field is required." })}
                                    className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]"
                                ></textarea>
                                {errors.content && (
                                    <p className="text-yellow-400 text-sm mt-1">{errors.content.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Priority Selector */}
                        <div className="w-full">
                            <select {...register("priority", { required: "This field is required." })}
                                className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] hover:bg-[#4b3628] transition"
                                defaultValue="">
                                <option value="" disabled>
                                    Select priority:
                                </option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {errors.priority && (
                                <p className="text-yellow-400 text-sm mt-1">{errors.priority.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit"
                            className="bg-[#FBBF24] text-[#2b2950] font-semibold py-2 px-6 rounded hover:bg-[#e0a800] focus:outline-none focus:ring-2 focus:ring-[#fde68a] transition">
                            {editIndex !== null ? "Update Note" : "Add Note"}
                        </button>
                        {/* <button
                            type="submit"
                            className="border-2 border-[#FBBF24] text-[#FBBF24] font-semibold py-2 px-6 rounded hover:bg-[#FBBF24] hover:text-[#2b2950] transition"
                        >
                            {editIndex !== null ? "Update Note" : "Add Note"}
                        </button> */}

                    </div>

                    {/* Saved Entries */}
                    <div className="w-full rounded-xl border border-yellow-600 p-4 sm:p-6 space-y-4 bg-[#1f1b3a]">
                        <h2 className="text-center text-yellow-400 text-xl font-bold">
                            Saved Notes ({savedNotes.length})
                        </h2>
                            
                        {savedNotes.map((entry, index) => (
                            <div
                                key={entry._id}
                                className="p-4 rounded-lg border border-yellow-700 bg-[#2b2950] hover:shadow-lg transition space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-yellow-300 font-medium">Title: {entry.title}</p>
                                        <p className="text-white">Content: {entry.content}</p>
                                        <p className="text-yellow-100">Priority: {entry.priority}</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            Added: {new Date(entry.time).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                        <button onClick={() => handleEdit(index)}
                                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition" title="Edit entry">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(index)}
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition" title="Delete entry">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Entries */}
                    {savedNotes.length === 0 && (
                        <div className="w-full p-6 text-center rounded-xl border border-yellow-600 bg-[#1f1b3a]">
                            <p className="text-yellow-400 text-lg">
                                No saved notes yet. Add your first note above!
                            </p>
                        </div>
                    )}

                </form>
            </div>
        </>
    )
}

export default Home