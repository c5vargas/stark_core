

const TableHead = ({values}: {values: string[]}) => {
	return (
		<thead>
			<tr className="[&>th>a]:text-[0.6em] [&>th>a]:text-gray-400 [&>th>a]:uppercase [&>th]:ps-6 [&>th]:py-3">
				{ values.map(item => <th key={item}><a href="#">{item}</a></th>) }
			</tr>
		</thead>
	)
}

export default TableHead