function Alert({alert}) {
  return (
  <>
    <div>
      <p className={`${alert.error ? 'bg-red-700' : 'bg-blue-600'} uppercase text-white border border-white py-1 rounded-sm font-bold text-center`} >{alert.msg}</p>
    </div>
  </>
  )
}

export default Alert