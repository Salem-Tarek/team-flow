import { useState, useEffect, useRef } from "react"

function GenericTable({
    columns = [],
    initialData = [],
    showCheckbox = true,
    showActions = true,
    onEditClick,
    onDeleteClick,
    onViewClick,
    isLoading,
}) {
    const [data, setData] = useState(initialData)

    const checkAll = data.length > 0 && data.every((item) => item.checked)

    const isIntermediate =
        data.some((item) => item.checked) &&
        data.some((item) => !item.checked)

    const checkAllCheckbox = useRef(null)

    function handleCheckAll(isChecked) {
        toggleCheckAll(isChecked)
    }

    function toggleCheckAll(isChecked) {
        const updatedData = data.map((item) => ({
            ...item,
            checked: isChecked,
        }))

        setData(updatedData)
    }

    function handleCheck(id) {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked }
            }

            return item
        })

        setData(updatedData)
    }

    useEffect(() => {
        if (checkAllCheckbox.current) {
            checkAllCheckbox.current.indeterminate = isIntermediate
        }
    }, [isIntermediate])

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {showCheckbox && isLoading && (
                            <th>
                                <span className="skeleton w-[24px] h-[24px] rounded-sm block"></span>
                            </th>
                        )}

                        {!isLoading && showCheckbox && (
                            <th>
                                <span>
                                    <input
                                        ref={checkAllCheckbox}
                                        checked={checkAll}
                                        onChange={(e) =>
                                            handleCheckAll(e.target.checked)
                                        }
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                </span>
                            </th>
                        )}

                        {columns.map((column) => (
                            <th key={`column_${column.key}`}>
                                {isLoading && (
                                    <div className="skeleton h-3 w-[60px]"></div>
                                )}

                                {!isLoading && (
                                    <div className="font-bold">
                                        {column.label}
                                    </div>
                                )}
                            </th>
                        ))}

                        {showActions && <th></th>}
                    </tr>
                </thead>

                <tbody>
                    {isLoading &&
                        Array.from({ length: 2 }).map((_, index) => (
                            <tr key={`skeleton_row_${index}`}>
                                {showCheckbox && (
                                    <th>
                                        <span className="skeleton w-[24px] h-[24px] rounded-sm block"></span>
                                    </th>
                                )}

                                {columns.map((column) => (
                                    <td key={`skeleton_${column.key}`}>
                                        {column.key === "actions" ? (
                                            showActions && (
                                                <span className="flex gap-1">
                                                    <span className="skeleton w-[24px] h-[24px] rounded-sm block"></span>
                                                    <span className="skeleton w-[24px] h-[24px] rounded-sm block"></span>
                                                    <span className="skeleton w-[24px] h-[24px] rounded-sm block"></span>
                                                </span>
                                            )
                                        ) : (
                                            <div className="skeleton h-3 w-[80px]"></div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    {!isLoading && data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + (showCheckbox ? 1 : 0)} className="text-center py-10">
                                <div className="flex flex-col items-center justify-center gap-2 text-base-content/60">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="48"
                                        height="48"
                                        fill="currentColor"
                                        className="opacity-40 mb-1"
                                    >
                                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 13.7845 4.59473 15.4194 5.60417 16.7497L16.7497 5.60417C15.4194 4.59473 13.7845 4 12 4ZM18.3958 7.25031L7.25031 18.3958C8.58057 19.4053 10.2155 20 12 20C16.4183 20 20 16.4183 20 12C20 10.2155 19.4053 8.58057 18.3958 7.25031Z"></path>
                                    </svg>
                                    <p className="font-semibold text-lg">No data found</p>
                                    <p className="text-sm opacity-80">There are no items to display at the moment.</p>
                                </div>
                            </td>
                        </tr>
                    )}

                    {!isLoading &&
                        data.length > 0 &&
                        data.map((item) => (
                            <tr key={item.id}>
                                {showCheckbox && (
                                    <th>
                                        <label>
                                            <input
                                                checked={!!item.checked}
                                                onChange={() =>
                                                    handleCheck(item.id)
                                                }
                                                type="checkbox"
                                                className="checkbox"
                                            />
                                        </label>
                                    </th>
                                )}

                                {columns.map((column) => {
                                    if (column.key !== "actions") {
                                        return (
                                            <td key={`row_${column.key}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="font-bold">
                                                        {item[column.key]}
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    }

                                    if (
                                        column.key === "actions" &&
                                        column.actions?.length &&
                                        showActions
                                    ) {
                                        return (
                                            <td key={`row_${column.key}`}>
                                                <div className="flex gap-1 items-center">
                                                    {column.actions.includes(
                                                        "edit"
                                                    ) && (
                                                            <button
                                                                onClick={() =>
                                                                    onEditClick?.(item)
                                                                }
                                                                className="btn btn-soft btn-sm"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="20"
                                                                    height="20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
                                                                </svg>
                                                            </button>
                                                        )}

                                                    {column.actions.includes(
                                                        "view"
                                                    ) && (
                                                            <button
                                                                onClick={() =>
                                                                    onViewClick?.(item)
                                                                }
                                                                className="btn btn-soft btn-sm"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="20"
                                                                    height="20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6571 13.6571 15 12.0003 15Z"></path>
                                                                </svg>
                                                            </button>
                                                        )}

                                                    {column.actions.includes(
                                                        "delete"
                                                    ) && (
                                                            <button
                                                                onClick={() =>
                                                                    onDeleteClick?.(item)
                                                                }
                                                                className="btn btn-soft btn-sm"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="20"
                                                                    height="20"
                                                                    fill="var(--color-error)"
                                                                >
                                                                    <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z"></path>
                                                                </svg>
                                                            </button>
                                                        )}
                                                </div>
                                            </td>
                                        )
                                    }

                                    return null
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default GenericTable
