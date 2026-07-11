"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TransactionEntry = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
  type: string;
  radio: string;
  time: string;
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:9999/Transaction", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load transactions");
        }

        const data: TransactionEntry[] = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const latestTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.time || b.date).getTime() - new Date(a.time || a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const totalIncome = transactions
    .filter((transaction) => transaction.radio?.toLowerCase() === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.radio?.toLowerCase() === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

  const currentBalance = totalIncome - totalExpenses;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f0fdf9_0%,#ffffff_100%)] px-4 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-teal-100 bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
              Personal Finance Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back to Lite Tracker</h1>
          </div>

          <Link
            href="/transactions"
            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            + Add New Transaction
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Current Balance</p>
            <p className="mt-2 text-3xl font-bold text-teal-700">
              {currencyFormatter.format(currentBalance)}
            </p>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Income</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {currencyFormatter.format(totalIncome)}
            </p>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Expenses</p>
            <p className="mt-2 text-3xl font-bold text-rose-500">
              {currencyFormatter.format(totalExpenses)}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Latest 5 Transactions</h2>
            <Link href="/transactions" className="text-sm font-semibold text-teal-700 hover:text-teal-900">
              View All
            </Link>
          </div>

          {loading ? (
            <p className="rounded-2xl bg-teal-50 p-4 text-sm text-slate-600">Loading latest transactions...</p>
          ) : latestTransactions.length === 0 ? (
            <p className="rounded-2xl bg-teal-50 p-4 text-sm text-slate-600">
              No transactions yet. Add your first one to see the dashboard update.
            </p>
          ) : (
            <div className="space-y-3">
              {latestTransactions.map((transaction) => (
                <div
                  key={transaction._id ?? `${transaction.date}-${transaction.description}`}
                  className="flex flex-col gap-2 rounded-2xl border border-teal-100 bg-teal-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{transaction.description}</p>
                    <div className="mt-1 flex gap-2 text-sm text-slate-500">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.radio?.toLowerCase() === "income"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {transaction.radio}
                    </span>
                    <span className="font-bold text-slate-900">
                      {transaction.radio?.toLowerCase() === "income" ? "+" : "-"}
                      {currencyFormatter.format(Number(transaction.amount || 0))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}