import { Link } from 'react-router-dom'

function Breadcrumb({ items, className = "" }) {
    return (
        <nav className={`flex items-center gap-2 text-sm ${className}`}>
            {items.map((item, index) => (
                <div className="flex gap-2" key={`breadcrumb_item_${index}`}>
                    {item.to && index !== items.length - 1 ? (
                        <Link to={item.to}>
                            {item.label || item.name}
                        </Link>
                    ) : (
                        <span className="font-semibold">
                            {item.label || item.name}
                        </span>
                    )}

                    {index < items.length - 1 && (
                        <span className="">
                            /
                        </span>
                    )}
                </div>
            ))}
        </nav >
    )
}

export default Breadcrumb

