interface Props {
  icon: JSX.Element
  onClick: () => void
}

const TableActionBtn = ({ icon, onClick }: Props) => {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full py-2 text-xl duration-300 hover:bg-gray-200"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default TableActionBtn
