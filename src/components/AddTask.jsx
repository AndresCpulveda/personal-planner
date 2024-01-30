import { useState, useMemo } from "react";
import moment from "moment";

import Alert from "./Alert";
import generarId from "../helpers/generarId";
import { toggleAddingTask, addNewTask } from "../store/tasks/tasks.slice";
import { useDispatch } from "react-redux";
import { selectTasksCategories } from "../store/tasks/tasks.selectors";
import { useSelector } from "react-redux";
import { useAddNewTaskMutation } from "../store/tasks/tasks.api";

function AddTask() {
  const dispatch = useDispatch();
  const categories = useSelector(selectTasksCategories);
  const [postNewTask, { isLoading, error }] = useAddNewTaskMutation();

  const date = moment();
  const formattedDate = date.format("YYYY-MM-DD"); //TO USE AS DEFAULT VALUE OF "DUE DATE" FIELD

  //STATES FOR EACH FIELD ON THE FORM
  const [name, setName] = useState("");
  const [due, setDue] = useState(formattedDate);
  const [priority, setPriority] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequencyInterval, setFrequencyInterval] = useState(1);
  const [intervalUnit, setIntervalUnit] = useState("days");
  const [category, setCategory] = useState("");
  const [hoursToComplete, setHoursToComplete] = useState(0);
  const [minutesToComplete, setMinutesToComplete] = useState(0);

  const [alert, setAlert] = useState({}); //TO CONDITIONALY SHOW THE ALERT COMPONENT

  const handleAddTask = async (e) => {
    //VALIDATES FORM AND CALLS FUNCTION IN THE PROVIDER TO SEND THE TASK
    e.preventDefault();
    if ([name, due, priority].includes("")) {
      setAlert({ msg: "Use all the fields", error: true });
      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    //CREATE TASK OBJECT TO BE SENT
    const id = generarId();
    const time = hoursToComplete * 3600 + minutesToComplete * 60;
    const dismissed = false;
    const stopWatch = time === 0;
    const task = {
      name,
      id,
      due,
      priority,
      isRecurring,
      frequencyInterval,
      intervalUnit,
      category,
      time,
      dismissed,
      completed: false,
      stopWatch,
    };

    dispatch(addNewTask(task));
    try {
      await postNewTask(task);
    } catch (e) {
      console.error("Error adding task:", error);
    }
    dispatch(toggleAddingTask());
  };

  return (
    <>
      <div
        className="out-modal fixed left-0 top-0 flex h-screen w-screen place-content-center bg-gray-800 p-8 opacity-95"
        onClick={(e) => {
          if (e.target.classList.contains("out-modal")) {
            dispatch(toggleAddingTask());
          }
        }}
      >
        <form
          className="flex w-2/4 flex-col justify-evenly rounded bg-white px-24 py-8"
          onSubmit={handleAddTask}
        >
          <div className="grid grid-cols-2">
            <div className="grid gap-8 font-semibold text-gray-900">
              <label className="uppercase">Name</label>
              <label className="uppercase">Due Date</label>
              <label className="uppercase">Priority</label>
              <label className="uppercase">Recurring Task?</label>
              <label
                className={`flex ${isRecurring ? "" : "text-gray-500"} uppercase`}
              >
                Frequency
              </label>
              <label className="uppercase">Category</label>
              <label className="uppercase">time to complete</label>
            </div>

            <div className="grid gap-8">
              <input
                autoFocus
                className="h-8 rounded-md bg-gray-300 px-2"
                onChange={(e) => setName(e.target.value)}
              ></input>

              <input
                // defaultValue={due}
                defaultValue={due}
                type="date"
                className="h-8 rounded-md bg-gray-300 px-2"
                onChange={(e) => setDue(e.target.value)}
              ></input>

              <select
                required
                defaultValue={"empty"}
                className="h-8 rounded-md bg-gray-300 p-2"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="empty"></option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                required
                defaultValue={"no"}
                className="h-8 rounded-md bg-gray-300 p-2"
                onChange={(e) =>
                  setIsRecurring(e.target.value === "No" ? false : true)
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <div className={`flex ${isRecurring ? "" : "text-gray-500"}`}>
                <span className="mr-2 pt-1">Every:</span>
                <input
                  type="number"
                  defaultValue={frequencyInterval}
                  disabled={!isRecurring}
                  className="h-8 w-12 rounded-md bg-gray-300 p-2"
                  onChange={(e) => setFrequencyInterval(e.target.value)}
                ></input>
                <select
                  disabled={!isRecurring}
                  defaultValue={intervalUnit}
                  onChange={(e) => {
                    setIntervalUnit(e.target.value);
                  }}
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>

              <input
                list="categoriesList"
                className="h-8 rounded-md bg-gray-300 p-1"
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
              <datalist id="categoriesList">
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </datalist>

              <div className={`flex`}>
                <input
                  type="number"
                  className="h-8 w-12 rounded-md bg-gray-300 p-2"
                  defaultValue={hoursToComplete}
                  onChange={(e) => setHoursToComplete(parseInt(e.target.value))}
                ></input>
                <span className="ml-1 mr-4 pt-1">Hours</span>
                <input
                  type="number"
                  className="h-8 w-12 rounded-md bg-gray-300 p-2"
                  defaultValue={minutesToComplete}
                  onChange={(e) =>
                    setMinutesToComplete(parseInt(e.target.value))
                  }
                ></input>
                <span className="ml-1 mr-4 pt-1">minutes</span>
              </div>
            </div>
          </div>
          {alert.msg ? (
            <Alert alert={alert} />
          ) : (
            <input
              type="submit"
              value="agregar"
              className={`w-full cursor-pointer rounded-md border border-white bg-blue-700 py-2 text-center text-lg font-bold uppercase text-white`}
            ></input>
          )}
        </form>
      </div>
    </>
  );
}

export default AddTask;
