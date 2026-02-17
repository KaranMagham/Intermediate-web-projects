import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef, startTransition } from 'react';
import { useForm } from "react-hook-form";
import { Edit2, Trash2, Globe } from 'lucide-react';

const ManageTransactions = () => {
    const [showTransaction, setShowTransaction] = useState(false);
    const [savedTransactions, setsavedTransactions] = useState([]);

    const [editIndex, setEditIndex] = useState(null);
    const hasMounted = useRef(false);

    const getTransaction = async () => {
        try {
            let req = await fetch("http://localhost:9999/Transaction")
            const data = await req.json();
            setsavedTransactions(data)
            console.log(data)
        } catch (error) {
            console.error("Error fetching passwords:", error)
        }
    }

    useEffect(() => {
        if (!hasMounted.current) {
            getTransaction();
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
        const entry = savedTransactions[index];
        setEditIndex(index);
        setsavedTransactions(prev => prev.filter((_, i) => i !== index));
        setValue("amount", entry.amount);
        setValue("description", entry.description);
        setValue("date", entry.date);
        setValue("type", entry.type);
        setValue("radio", entry.radio);
        setValue("radio", entry.radio);
    };

    const handleDelete = async (index) => {
        const entryToDelete = savedTransactions[index];
        try {
            const res = await fetch(`http://localhost:9999/Transaction/${entryToDelete._id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete entry from backend");

            setsavedTransactions(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const onSubmit = async (data) => {
        const timestamp = new Date().toISOString();
        const newEntry = {
            amount: data.amount,
            description: data.description,
            date: data.date,
            type: data.type,
            radio: data.radio,
            time: timestamp,
        };

        if (editIndex !== null) {
            const idToUpdate = savedTransactions[editIndex]._id;
            try {
                const res = await fetch(`http://localhost:9999/Transaction/${idToUpdate}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to update entry");

                getTransaction();
                setEditIndex(null);
            } catch (error) {
                console.error("Error updating entry:", error);
            }
        } else {
            try {
                const res = await fetch("http://localhost:9999/Transaction", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to save entry");

                getTransaction();
            } catch (error) {
                console.error("Error saving entry:", error);
            }
        }

        reset();
    };


    return (
        <div className='w-full h-full bg-black  overflow-y-auto'>
            {/* Heading */}
            <div className="sticky top-0 bg-black underline z-10  py-2">
                <Link to="/transaction" className='text-[#FFD700] text-3xl px-3 font-bold cursor-pointer hover:text-white transition-all duration-300'>
                    Manage Transaction.
                </Link>
                <div className='w-full h-0.5 bg-amber-400 mt-5'></div>
            </div>
            {/* form section */}
            <div className='mt-3 px-2'>
                <div className="min-h-fit flex justify-center items-center px-4 py-8">
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-3xl bg-[#06080a] px-6 py-6 sm:px-8 sm:py-8 rounded-xl shadow-2xl border border-yellow-600 flex flex-col gap-6">
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            {editIndex !== null ? "Edit Transaction" : "Add Transaction"}
                        </h2>


                        {/* Amount */}
                        <div>
                            <input
                                type="number"
                                autoComplete="amount"
                                placeholder="Enter amount"
                                {...register("amount", { required: "This field is required.", min: { value: 1, message: "Amount must be at least ₹1." } })}
                                className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                            />
                            {errors.Amount && (
                                <p className="text-yellow-400 text-sm mt-1">{errors.amount.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* description */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    autoComplete="description"
                                    placeholder="Add a short description"
                                    {...register("description", { required: "This field is required." })}
                                    className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                                />
                                {errors.description && (
                                    <p className="text-yellow-400 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* date */}
                            <div className="w-full relative">
                                <input
                                    type="date"
                                    autoComplete="date"
                                    placeholder="Enter todays date"
                                    {...register("date", { required: "This field is required." })}
                                    className="bg-[#3d2b1f] w-full p-3 pr-10 rounded text-white placeholder:text-yellow-100"
                                />
                                {errors.date && (
                                    <p className="text-yellow-400 text-sm mt-1">{errors.date.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Transaction Type */}
                            <div className="w-full">
                                <select
                                    {...register("type", { required: "This field is required." })}
                                    className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select transaction type
                                    </option>

                                    {/* Income Section */}
                                    <optgroup label="Income">
                                        <option value="salary">Salary</option>
                                        <option value="bonus">Bonus</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="investment">Investment</option>
                                    </optgroup>

                                    {/* Expense Section */}
                                    <optgroup label="Expense">
                                        <option value="grocery">Grocery</option>
                                        <option value="food">Food</option>
                                        <option value="rent">Rent</option>
                                        <option value="transport">Transport</option>
                                        <option value="entertainment">Entertainment</option>
                                    </optgroup>
                                </select>

                                {errors.type && (
                                    <p className="text-yellow-400 text-sm mt-1">{errors.type.message}</p>
                                )}
                            </div>



                            {/* radio */}
                            <div className="w-full">
                                <select
                                    {...register("radio", { required: "This field is required." })}
                                    className="bg-[#3d2b1f] w-full p-3 rounded text-white placeholder:text-yellow-100"
                                    defaultValue="income">
                                    <option value="" disabled>
                                        Select transaction type
                                    </option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                                {errors.radio && (
                                    <p className="text-yellow-400 text-sm mt-1">{errors.radio.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-yellow-600 cursor-pointer hover:underline hover:bg-yellow-700 transition text-black font-bold py-2 px-6 rounded"
                            >
                                {editIndex !== null ? "Update Transaction" : "Add Transaction"}
                            </button>
                        </div>

                        {/* Saved Entries */}
                        <div className="w-full rounded-xl border border-yellow-600 p-4 sm:p-6 space-y-4">
                            <h2 className="text-center text-yellow-400 text-xl font-bold">
                                Saved Transactions ({savedTransactions.length})
                            </h2>

                            {savedTransactions.map((entry, index) => (
                                <div key={entry._id} className="p-4 rounded-lg border border-yellow-600 space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-yellow-300">Amount: ₹{entry.amount}</p>
                                            <p className="text-white">Description: {entry.description}</p>
                                            <p className="text-white">Date: {entry.date}</p>
                                            <p className="text-white">Type: {entry.type}</p>
                                            <p className="text-white">Category: {entry.radio}</p>
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

                        {/* No Entries */}
                        {savedTransactions.length === 0 && (
                            <div className="w-full p-6 text-center rounded-xl border border-yellow-600">
                                <p className="text-yellow-400 text-lg">
                                    No saved transactions yet. Add your first entry above!
                                </p>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageTransactions 