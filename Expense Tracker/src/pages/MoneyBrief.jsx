import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoneyBrief = () => {
    const [savedTransactions, setsavedTransactions] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedTransactions")) || [];
        const sorted = saved.sort((a, b) => new Date(b.date) - new Date(a.date));
        setsavedTransactions(sorted);
    }, []);


    // 💰 Calculations
    const totalIncome = savedTransactions
        .filter((item) => item.radio === "income")
        .reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);

    const totalExpense = savedTransactions
        .filter((item) => item.radio === "expense")
        .reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="w-full h-full bg-black overflow-y-auto">
            {/* Heading */}
            <div className="sticky top-0 bg-black underline z-10 py-2">
                <Link
                    to="/"
                    className="text-[#FFD700] text-3xl px-3 font-bold cursor-pointer hover:text-white transition-all duration-300"
                >
                    MoneyBrief.
                </Link>
                <div className="w-full h-0.5 bg-amber-400 mt-5"></div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                <div className="bg-[#3d2b1f] p-4 rounded shadow text-white border-2 border-yellow-700">
                    <h2 className="text-yellow-300">Total Income</h2>
                    <p className="text-green-400 font-bold text-xl">₹{totalIncome.toLocaleString()}</p>
                </div>
                <div className="bg-[#3d2b1f] p-4 rounded shadow text-white border-2 border-yellow-700">
                    <h2 className="text-yellow-300">Total Expense</h2>
                    <p className="text-red-400 font-bold text-xl">₹{totalExpense.toLocaleString()}</p>
                </div>
                <div className="bg-[#3d2b1f] p-4 rounded shadow text-white border-2 border-yellow-700">
                    <h2 className="text-yellow-300">Net Balance</h2>
                    <p className={`font-bold text-xl ${balance < 0 ? "text-red-400" : "text-white"}`}>
                        ₹{balance.toLocaleString()}</p>
                    {balance < 0 && (
                        <p className="text-red-400 mt-2 italic text-sm">⚠️ You’re running a deficit! Time to save more.</p>
                    )}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-4 mt-6">
                <h3 className="text-yellow-400 text-xl mb-3 underline">Recent Transactions</h3>
                <ul role="list" className="space-y-3 mb-3">
                    {savedTransactions.length === 0 ? (
                        <p className="text-yellow-200 italic py-4">No transactions found.</p>
                    ) : (
                        savedTransactions.slice(-5).reverse().map((txn) => (
                            <li key={txn.id} className="bg-[#2b1d14] text-white p-3 rounded-lg border-2 border-yellow-700">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-semibold">{txn.description}</p>
                                        <p className="text-xs text-yellow-200">{new Date(txn.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-bold ${txn.radio === "income" ? "text-green-400" : "text-red-400"}`}>
                                            ₹{parseFloat(txn.Amount).toLocaleString()}
                                        </p>
                                        <p className="text-xs">{txn.type}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
                <Link to="transactions" className="text-yellow-400  text-basel mb-4 underline">View all transactions</Link>
            </div>
            {/* <div className="w-full h-0.5 bg-amber-400 mt-5"></div> */}
            {/* Quick Add Transaction */} 
            {/* <div>
                <section className='mb-6 mt-6'>
                    <h2 className='text-2xl text-white font-bold mb-2'>➕ Quick Add</h2>
                    <form className='grid grid-cols-1  mt-6 md:grid-cols-3 gap-4'>
                        <input type='text' placeholder='Description' className='p-2 m-2 rounded bg-gray-700 text-white' />
                        <input type='number' placeholder='Amount' className='p-2 rounded m-2 bg-gray-700 text-white' />
                        <select className='p-2 m-2 rounded bg-gray-700 text-white'>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </select>
                        <button type='submit' className='col-span-1 mt-4 md:col-span-3 bg-amber-500 hover:bg-amber-600 p-2 rounded text-black font-bold'>
                            Add Transaction
                        </button>
                    </form>
                </section>
            </div> */}

            {/* Footer */}
            <footer className='mt-10 py-4 text-sm text-gray-400 text-center border-t border-yellow-700'>
                Made with 💛 by <span className="text-yellow-400 font-medium">Karan Magham</span> — BSc CS Student & Web Developer
            </footer>

        </div>
    );
};

export default MoneyBrief;
