const TableHead = ({ values }: { values: string[] }) => {
  return (
    <thead>
      <tr className="[&>th]:py-3 [&>th]:ps-6 [&>th>a]:text-[0.6em] [&>th>a]:text-gray-400 [&>th>a]:uppercase">
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
