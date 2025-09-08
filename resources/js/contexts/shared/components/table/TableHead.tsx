const TableHead = ({ values }: { values: string[] }) => {
  return (
    <thead>
      <tr className="[&>th>a]:text-[0.6em] [&>th>a]:uppercase [&>th>a]:text-gray-400 [&>th]:py-3 [&>th]:ps-6">
        {values.map(item => (
          <th key={item}>
            <a href="#">{item}</a>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
