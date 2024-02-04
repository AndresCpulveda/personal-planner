import React from "react";

export const WarningNotification = ({
  notificationOptions: {
    primaryText,
    secondaryText,
    action1,
    action2,
    showing,
  },
}) => {
  return (
    <div className={`space-y-5 ${showing ? "" : "hidden"}`}>
      <div className="absolute bottom-4 right-0 mx-auto max-w-[400px] rounded-xl border border-gray-50 bg-white p-4 text-sm shadow-lg">
        <button className="ttop-4 absolute right-4 ml-auto text-gray-500 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div className="flex space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="pr-6 font-medium text-gray-900">{primaryText}</h4>
            <div className="mt-1 text-gray-500">{secondaryText}</div>
            <div className="mt-2 flex space-x-4">
              {action1 ? (
                <button className="inline-block font-medium leading-loose text-gray-500 hover:text-gray-900">
                  action1.text
                </button>
              ) : null}
              {action2 ? (
                <button className="text-primary-600 hover:text-primary-700 inline-block font-medium leading-loose">
                  action2.text
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
