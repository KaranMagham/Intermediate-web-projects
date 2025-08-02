import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';

const OverviewPage = () => {
    const [savedTransactions, setsavedTransactions] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:9999/api/transactions"); // Change if hosted
                const data = await res.json();
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setsavedTransactions(sorted);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchData();
    }, []);

    // 💰 Calculations
    const totalIncome = savedTransactions
        .filter((item) => item.radio === "income")
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const totalExpense = savedTransactions
        .filter((item) => item.radio === "expense")
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    // 🧾 Prepare Data for Chart (last 7 entries)
    const chartData = savedTransactions.slice(-7).map((txn, index, arr) => {
        const income = txn.radio === "income" ? parseFloat(txn.amount) : 0;
        const expense = txn.radio === "expense" ? parseFloat(txn.amount) : 0;

        // Calculate balance up to this transaction
        const balance = arr.slice(0, index + 1).reduce((acc, t) => {
            const amt = parseFloat(t.amount);
            return acc + (t.radio === "income" ? amt : -amt);
        }, 0);

        return {
            date: new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            income,
            expense,
            balance
        };
    });

    const pieData = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
    ];
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black text-white text-sm p-2 border border-yellow-400 rounded">
                    <p>{`${payload[0].name}: ₹${payload[0].value.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };


    const pieColors = ['#00C49F', '#FF4C4C']; // Green for income, red for expense
    const balance = totalIncome - totalExpense;

    return (
        <div className='w-full h-full bg-black  overflow-y-auto'>
            {/* Heading */}
            <div className="sticky top-0 bg-black z-10 py-4 ">
                <Link to="/overview" className='text-[#FFD700] text-3xl font-bold cursor-pointer hover:text-white transition-all duration-300'>
                    <h1 className='pl-6'>Overview 🧾</h1>
                </Link>
                <div className='w-full h-0.5 bg-amber-400 '></div>
            </div>
            <div className='w-full h-full bg-black text-[#FFD700] px-4 py-6 overflow-y-auto'>

                {/* Balance Summary */}
                <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                    <div className='bg-gray-900 p-4 rounded-xl shadow'>
                        <h2 className='text-xl font-semibold'>💰 Total Balance</h2>
                        <p className='text-2xl mt-2 text-white'>{balance.toLocaleString()}</p>
                    </div>
                    <div className='bg-gray-900 p-4 rounded-xl shadow'>
                        <h2 className='text-xl font-semibold'>📈 Income</h2>
                        <p className='text-2xl mt-2 text-green-400'>{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className='bg-gray-900 p-4 rounded-xl shadow'>
                        <h2 className='text-xl font-semibold'>📉 Expense</h2>
                        <p className='text-2xl mt-2 text-red-400'>{totalExpense.toLocaleString()}</p>
                    </div>
                </section>

                {/* Latest Transactions */}
                <section className='mb-6'>
                    <h2 className='text-2xl font-bold mb-2'>🧾 Latest Transactions</h2>
                    <ul role="list" className="space-y-3">
                        {savedTransactions.length === 0 ? (
                            <p className="text-yellow-200 italic py-4">No transactions found.</p>
                        ) : (
                            savedTransactions.slice(-5).reverse().map((txn) => (
                                <li key={txn._id} className="bg-[#2b1d14] text-white p-3 rounded-lg border-2 border-yellow-700">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-semibold">{txn.description}</p>
                                            <p className="text-xs text-yellow-200">{txn.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-lg font-bold ${txn.radio === "income" ? "text-green-400" : "text-red-400"}`}>
                                                ₹{parseFloat(txn.amount).toLocaleString()}
                                            </p>
                                            <p className="text-xs">{txn.type}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </section>

                {/* 📊 Chart Section */}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} name="Income" />
                        <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} name="Expense" />
                        <Line type="monotone" dataKey="balance" stroke="#FFD700" strokeWidth={2} name="Balance" />
                    </LineChart>
                </ResponsiveContainer>

                {/* Pie chart section */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">📊 Income vs Expense (Pie Chart)</h2>
                    <div className="w-full h-[380px] bg-gray-900 rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5}
                                    dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default OverviewPage


