import React, { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpensesTable({
  expenses,
  setExpenses,
  setExpense,
  setEditingRowID,
}) {
  // const [category,setCategory]=useState('');
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const [sortCallBack, setSortCallBack] = useState(() => () => {});
  const total = filteredData.reduce(
    (accumulator, current) => accumulator + parseFloat(current.amount),
    0
  );
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  //console.log(total)
  // console.log(filteredData)
  // const filteredData=expenses.filter((expense)=>{
  //   return expense.category.toLowerCase().includes(category)
  // })

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        setExpense={setExpense}
        expenses={expenses}
        setExpenses={setExpenses}
        setEditingRowID={setEditingRowID}
        rowId={rowId}
      />
      <table className="expense-table" onClick={() => setMenuPosition({})}>
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSortCallBack(
                      () => (a, b) => a.title.localeCompare(b.title)
                    )
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSortCallBack(
                      () => (a, b) => b.title.localeCompare(a.title)
                    )
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              >
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSortCallBack(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSortCallBack(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .sort(sortCallBack)
            .map(({ id, title, category, amount }, i) => (
              <tr
                key={i}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                  setRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th>
              <button style={{width:200,textAlign:"center"}}
                onClick={() => {
                  setSortCallBack(() => () => {});
                }}
              >
                Clear
              </button>
            </th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
