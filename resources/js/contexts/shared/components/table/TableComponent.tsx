import Loading from "@/contexts/shared/components/Loading"


const TableComponent = ({children, loading}: {children: React.ReactElement[], loading: boolean}) => {
	if(loading)
		return <section className="min-h-[300px] w-full flex items-center justify-center"><Loading /></section>

	return (
		<table className="table-auto border-collapse w-full">
			{children}
		</table>
	)
}

export default TableComponent