

interface Props {
  icon: JSX.Element,
  onClick: () => void
}

const TableActionBtn = ({icon, onClick}: Props) => {
	return (
		<button className="py-2 text-xl hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full duration-300" onClick={onClick}>
      {icon}
    </button>
	)
}

export default TableActionBtn
