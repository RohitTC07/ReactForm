import React from "react";
import expenseData from "../expenseData";

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  expenses,
  setExpense,
  setEditingRowID,
  rowId,
}) {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={{...menuPosition }}>
      <div
        onClick={() => {
         const{title,category,amount}= expenses.find((expense)=>expense.id === rowId)
        // console.log(foundExpense)
        setEditingRowID(rowId)
          setExpense({title,category,amount});
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          console.log("deleting");
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id != rowId)
          );

          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
