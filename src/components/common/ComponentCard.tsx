
interface ComponentCardProps {
    title:string, 
    children:React.ReactNode, 
    classname?:string
}

const ComponentCard = ({title,children,classname}:ComponentCardProps) => {
  return (
    <div className={`rounded-2xl border-gray-200 border bg-white ${classname}`}>
        <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800">    
                {title}
            </h3>
        </div>
        <div className="p-4 border-gray-100 sm:p-6">
            <div className="space-y-6">{children}</div>
        </div>
    </div>
  )
}

export default ComponentCard