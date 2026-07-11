"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type TransactionFormValues = {
    amount: string;
    description: string;
    date: string;
    type: string;
    radio: string;
};

type TransactionEntry = TransactionFormValues & {
    _id?: string;
    time: string;
};

export default function TransactionsPage() {
    const [savedTransactions, setSavedTransactions] = useState<TransactionEntry[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const hasMounted = useRef(false);

    const getTransaction = async () => {
        try {
            const req = await fetch("http://localhost:9999/Transaction");
            const data: TransactionEntry[] = await req.json();
            setSavedTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

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
    } = useForm<TransactionFormValues>();

    const handleEdit = (index: number) => {
        const entry = savedTransactions[index];

        if (!entry) return;

        setEditIndex(index);
        setValue("amount", String(entry.amount));
        setValue("description", entry.description);
        setValue("date", entry.date);
        setValue("type", entry.type);
        setValue("radio", entry.radio);
    };

    const handleDelete = async (index: number) => {
        const entryToDelete = savedTransactions[index];

        if (!entryToDelete?._id) return;

        try {
            const res = await fetch(`http://localhost:9999/Transaction/${entryToDelete._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete entry from backend");

            setSavedTransactions((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const onSubmit = async (data: TransactionFormValues) => {
        const timestamp = new Date().toISOString();
        const newEntry = {
            amount: Number(data.amount),
            description: data.description,
            date: data.date,
            type: data.type,
            radio: data.radio,
            time: timestamp,
        };

        if (editIndex !== null) {
            const idToUpdate = savedTransactions[editIndex]?._id;

            if (!idToUpdate) return;

            try {
                const res = await fetch(`http://localhost:9999/Transaction/${idToUpdate}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEntry),
                });

                if (!res.ok) throw new Error("Failed to update entry");

                await getTransaction();
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

                await getTransaction();
            } catch (error) {
                console.error("Error saving entry:", error);
            }
        }

        reset();
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f0fdf9_0%,#ffffff_100%)] px-4 py-8 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-5">
                <div className="rounded-3xl border border-teal-100 bg-white/90 p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
                                Transactions
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage Transaction</h1>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="min-h-fit flex justify-center items-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-3xl rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <h2 className="mb-5 text-xl font-semibold text-teal-700">
                            {editIndex !== null ? "Edit Transaction" : "Add Transaction"}
                        </h2>

                            <div className="mb-4 gap-4">
                                <input
                                    type="number"
                                    autoComplete="amount"
                                    placeholder="Enter amount"
                                    {...register("amount", {
                                        required: "This field is required.",
                                        min: { value: 1, message: "Amount must be at least ₹1." },
                                    })}
                                    className="w-full rounded-xl border border-teal-100 bg-teal-50 p-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                                />
                                {errors.amount?.message && (
                                    <p className="mt-1 text-sm text-rose-500">{errors.amount.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        autoComplete="description"
                                        placeholder="Add a short description"
                                        {...register("description", { required: "This field is required." })}
                                        className="w-full rounded-xl border border-teal-100 bg-teal-50 p-3 text-slate-900 outline-none placeholder:text-slate-400"
                                    />
                                    {errors.description?.message && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.description.message}</p>
                                    )}
                                </div>

                                <div className="w-full relative">
                                    <input
                                        type="date"
                                        autoComplete="date"
                                        placeholder="Enter todays date"
                                        {...register("date", { required: "This field is required." })}
                                        className="w-full rounded-xl border border-teal-100 bg-teal-50 p-3 pr-10 text-slate-900 outline-none placeholder:text-slate-400"
                                    />
                                    {errors.date?.message && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.date.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="w-full">
                                    <select
                                        {...register("type", { required: "This field is required." })}
                                        className="bg-[#3d2b1f] mt-2 w-full p-3 rounded text-white placeholder:text-yellow-100"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select transaction type
                                        </option>
                                        <optgroup label="Income">
                                            <option value="salary">Salary</option>
                                            <option value="bonus">Bonus</option>
                                            <option value="freelance">Freelance</option>
                                            <option value="investment">Investment</option>
                                        </optgroup>
                                        <optgroup label="Expense">
                                            <option value="grocery">Grocery</option>
                                            <option value="food">Food</option>
                                            <option value="rent">Rent</option>
                                            <option value="transport">Transport</option>
                                            <option value="entertainment">Entertainment</option>
                                        </optgroup>
                                    </select>

                                    {errors.type?.message && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.type.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <select
                                        {...register("radio", { required: "This field is required." })}
                                        className="bg-[#3d2b1f] w-full p-3 mt-2 rounded text-white placeholder:text-yellow-100"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select category
                                        </option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                    {errors.radio?.message && (
                                        <p className="mt-1 text-sm text-rose-500">{errors.radio.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center m-2.5">
                                <button
                                    type="submit"
                                    className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                                >
                                    {editIndex !== null ? "Update Transaction" : "Add Transaction"}
                                </button>
                            </div>

                            <div className="w-full rounded-2xl border border-teal-100 bg-teal-50/40 p-4 sm:p-6 space-y-4">
                                <h2 className="text-center text-teal-700 text-xl font-bold">
                                    Saved Transactions ({savedTransactions.length})
                                </h2>

                                {savedTransactions.map((entry, index) => (
                                    <div key={entry._id ?? `${entry.date}-${index}`} className="rounded-2xl border border-teal-100 bg-white p-4 space-y-2 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                            <div className="flex-1 space-y-1">
                                                <p className="font-semibold text-teal-700">Amount: ₹{entry.amount}</p>
                                                <p className="text-slate-700">Description: {entry.description}</p>
                                                <p className="text-slate-700">Date: {entry.date}</p>
                                                <p className="text-slate-700">Type: {entry.type}</p>
                                                <p className="text-slate-700">Category: {entry.radio}</p>
                                                <p className="text-slate-500 text-xs sm:text-sm">
                                                    Added: {new Date(entry.time).toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(index)}
                                                    className="rounded-full bg-emerald-500 p-2 text-white transition hover:bg-emerald-600"
                                                    title="Edit entry"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(index)}
                                                    className="rounded-full bg-rose-500 p-2 text-white transition hover:bg-rose-600"
                                                    title="Delete entry"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {savedTransactions.length === 0 && (
                                <div className="w-full rounded-2xl border border-teal-100 bg-teal-50 p-6 text-center">
                                    <p className="text-teal-700 text-lg">
                                        No saved transactions yet. Add your first entry above!
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
    );
}