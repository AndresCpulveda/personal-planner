function Alert({alert}) {
  return (
  <>
    <div className={`${alert.error ? 'bg-red-700' : 'bg-blue-600'} uppercase text-lg text-white border border-white py-2 rounded-md w-full font-bold text-center`}>
      <p>{alert.msg}</p>
    </div>
  </>
  )
}

export default Alert