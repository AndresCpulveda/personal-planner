import { useEffect, useState } from "react";

import Task from "./Task";
import {
  sortByBoolean,
  sortDueBoolean,
  sortPriority,
  sortCreatedBoolean,
  sortCategory,
} from "../helpers/helpers";
import { btnStyles } from "../helpers/StyleHelpers";
import { useSelector } from "react-redux";
import { selectTasksTasks } from "../store/tasks/tasks.selectors";

function AllTasks() {
  const allTasks = useSelector(selectTasksTasks);
  const [showingTasks, setShowingTasks] = useState([]);
  const [activeBtn, setActiveBtn] = useState(3);

  const [arrowName, setArrowName] = useState(false);
  const [arrowCategory, setArrowCategory] = useState(true);
  const [arrowDue, setArrowDue] = useState(true);
  const [arrowPriority, setArrowPriority] = useState(false);
  const [arrowTime, setArrowTime] = useState(false);

  useEffect(() => {
    if (activeBtn === 3) {
      const uncompletedTasks = allTasks.filter((task) => !task.completed);
      setShowingTasks(uncompletedTasks);
    } else if (activeBtn === 2) {
      const completedTasks = allTasks.filter((task) => task.completed);
      setShowingTasks(completedTasks);
    } else {
      setShowingTasks(allTasks);
    }
  }, [allTasks]);

  const styles = {
    btns: {
      categoryBtns:
        "relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2",
      stateBtns: "cursor-default rounded-full h-2 w-2 mr-1",
    },
    table: {
      th: "px-5 py-4 font-medium text-gray-900",
      headings: {
        text: "flex items-center",
        icons: "w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900",
      },
    },
  };

  return (
    <>
      <div className="">
        <div className="align-center mb-4 flex justify-between p-1">
          <ul className="flex items-center gap-2 text-sm font-medium">
            <li>
              <a
                onClick={() => {
                  setActiveBtn(1);
                  setShowingTasks(allTasks);
                }}
                className={`${activeBtn === 1 ? btnStyles[1] : ""} ${styles.btns.categoryBtns} hover:bg-gray-200`}
              >
                All
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setActiveBtn(2);
                  const completedTasks = allTasks.filter(
                    (task) => task.completed,
                  );
                  setShowingTasks(completedTasks);
                }}
                className={`${activeBtn === 2 ? btnStyles[2] : ""} ${styles.btns.categoryBtns} hover:bg-green-100 hover:text-green-500`}
              >
                Completed
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setActiveBtn(3);
                  const uncompletedTasks = allTasks.filter(
                    (task) => !task.completed,
                  );
                  setShowingTasks(uncompletedTasks);
                }}
                className={`${activeBtn === 3 ? btnStyles[3] : ""} ${styles.btns.categoryBtns} hover:bg-red-100 hover:text-red-500`}
              >
                Uncompleted
              </a>
            </li>
            <li></li>
          </ul>
          <div className="ml-2 flex gap-4">
            <span className="text-sm">
              <button
                className={`${styles.btns.stateBtns} bg-yellow-500`}
              ></button>
              Low
            </span>
            <span className="text-sm">
              <button
                className={`${styles.btns.stateBtns} bg-orange-500`}
              ></button>
              Medium
            </span>
            <span className="text-sm">
              <button
                className={`${styles.btns.stateBtns} bg-red-500`}
              ></button>
              High
            </span>
            <span className="text-sm">
              <button
                className={`${styles.btns.stateBtns} bg-green-500`}
              ></button>
              Completed
            </span>
          </div>
        </div>

        <div className="w-full border-collapse bg-white text-left text-sm">
          <div className="bg-gray-50">
            <ul className="flex w-full bg-gray-50">
              <li className="w-3/12 px-3 py-4 font-medium text-gray-900">
                <span className={styles.table.headings.text}>
                  Task
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${arrowName ? "rotate-180" : ""} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(sortByBoolean(showingTasks, arrowName));
                      setArrowName(!arrowName);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </li>
              <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
                <span className={styles.table.headings.text}>
                  Due Date
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${arrowDue ? "rotate-180" : ""} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setArrowDue(sortDueBoolean(showingTasks, arrowDue));
                      setArrowDue(!arrowDue);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </li>
              <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
                <span className={styles.table.headings.text}>
                  Category
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${arrowCategory ? "rotate-180" : ""} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(
                        sortCategory(showingTasks, arrowCategory),
                      );
                      setArrowCategory(!arrowCategory);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </li>
              <li className="w-2/12 px-3 py-4 font-medium text-gray-900">
                <span className={styles.table.headings.text}>
                  State
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${arrowPriority ? "rotate-180" : ""} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(
                        sortPriority(showingTasks, arrowPriority),
                      );
                      setArrowPriority(!arrowPriority);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </li>
              <li className="w-3/12 px-3 py-4 font-medium text-gray-900">
                Actions
              </li>
            </ul>
          </div>
          <ul className="divide-y divide-gray-100 border-t border-gray-100">
            {showingTasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AllTasks;
