 const Table = ({
  children,
  dataThead,
}: {
  children: React.ReactNode;
  dataThead: string[];
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <table>
          <thead className="border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              {dataThead.map((i) => (
                <td key={i} className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  {i}
                </td>
              ))}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </div>
  );
};
export default Table