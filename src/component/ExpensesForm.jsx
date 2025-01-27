import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowID,
}) {
  const [errors, setErrors] = useState({});
  const validationConfig = {
    title: [
      { required: true, message: "Please Enter Title" },
      { minLength: 5, message: "Title Should Contains At Least 5 Charaters" },
    ],
    category: [{ required: true, message: "Please Select Category" }],
    amount: [
      { required: true, message: "Please Select Amount" },
      {
        pattern: /^[1-9]\d*(\.\d+)?$/,
        message: "Please enter valid amount",
      }
    ]
    // email:[{required:true,message:'Please Enter Email'},{    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //   message: 'Please enter a valid email',}]
  };
  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
        //email:''
      });
      setEditingRowID("");
      return;
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
      //email:''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {/* <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
        />
        <p className='error'>{errors.title}</p>
      </div> */}

      <Input
        id="title"
        name="title"
        label="Title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="----SELECT----"
        error={errors.category}
      />
      <Input
        id="amount"
        name="amount"
        label="Amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      {/* <Input id="email" name="email" label="Email" value={expense.email} onChange={handleChange} error={errors.email}/> */}
      {/* <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        <p className='error'>{errors.category}</p>
      </div> */}
      {/* <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
        <p className='error'>{errors.amount}</p>
      </div> */}
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
