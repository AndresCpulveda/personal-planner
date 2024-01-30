function Alert({ alert }) {
  return (
    <>
      <div
        className={`${alert.error ? "bg-red-700" : "bg-blue-600"} w-full rounded-md border border-white py-2 text-center text-lg font-bold uppercase text-white`}
      >
        <p>{alert.msg}</p>
      </div>
    </>
  );
}

export default Alert;
