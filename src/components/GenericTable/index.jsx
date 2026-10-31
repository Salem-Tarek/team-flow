import { useState, useEffect, useRef } from "react"
import { FormSelect } from "~/components/form/index.js"
import parse from 'html-react-parser';
import { Trash, Pencil, Eye, Ban } from "lucide-react"

function GenericTable({
  columns = [],
  initialData = [],
  showCheckbox = true,
  showActions = true,
  onEditClick,
  onDeleteClick,
  onViewClick,
  isLoading,
  isAdmin,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  perPage = 10,
  onPerPageChange,
}) {
  const [data, setData] = useState(initialData)

  const hasVisibleActions = showActions && columns.some((column) => {
    if (column.key !== "actions" || !column.actions?.length) return false

    return column.actions.some((action) => {
      if (action === "view") return true
      if (isAdmin && ["edit", "delete"].includes(action)) return true

      return false
    })
  })

  const updatePage = (newPage) => {
    onPageChange?.(newPage)
  }

  const showedItemsCount = Math.min(data?.length || totalItems, perPage)

  const checkAll = data?.length > 0 && data?.every((item) => item.checked)

  const isIntermediate =
    data?.some((item) => item.checked) &&
    data?.some((item) => !item.checked)

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
    <>
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

              {hasVisibleActions && <th></th>}
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
                        hasVisibleActions && (
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
                    <Ban className="opacity-40 mb-1" size={48} />
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
                          {column.htmlStrcuture ? <>{parse(column.htmlStrcuture({ value: item[column.key], label: column.label }))}</> : item[column.key]}
                        </td>
                      )
                    }

                    if (
                      column.key === "actions" &&
                      column.actions?.length &&
                      hasVisibleActions
                    ) {
                      return (
                        <td key={`row_${column.key}`}>
                          <div className="flex gap-1 items-center">
                            {isAdmin && column.actions.includes(
                              "edit"
                            ) && (
                                <button
                                  onClick={() =>
                                    onEditClick?.(item)
                                  }
                                  className="btn btn-soft btn-sm tooltip"
                                  data-tip="Edit"
                                >
                                  <Pencil size={20} />
                                </button>
                              )}

                            {column.actions.includes(
                              "view"
                            ) && (
                                <button
                                  onClick={() =>
                                    onViewClick?.(item)
                                  }
                                  className="btn btn-soft btn-sm tooltip"
                                  data-tip="View"
                                >
                                  <Eye size={20} />
                                </button>
                              )}

                            {isAdmin && column.actions.includes(
                              "delete"
                            ) && (
                                <button
                                  onClick={() =>
                                    onDeleteClick?.(item)
                                  }
                                  className="btn btn-soft btn-sm tooltip tooltip-error"
                                  data-tip="Delete"
                                >
                                  <Trash size={20} className="text-error" />
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
      <div className="flex flex-col tablet:flex-row gap-2 justify-between items-start tablet:items-center mt-6">
        <p className="flex gap-1">
          Showing {showedItemsCount} of {totalItems}
        </p>
        <div className="flex gap-2 items-center max-tablet:self-end">
          <FormSelect value={perPage} onChange={(e) => onPerPageChange?.(Number(e.target.value))} options={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]} />

          <div className={`join`}>
            <button onClick={() => updatePage(currentPage - 1)} className={`join-item btn ${(currentPage === 1 || isLoading) ? "btn-disabled" : ""}`}>«</button>
            {
              Array.from({ length: totalPages }).map((_, index) => (
                <button onClick={() => updatePage(index + 1)} key={index} className={`join-item btn ${index + 1 === currentPage ? "btn-primary" : ""} ${isLoading ? "btn-disabled" : ""}`}>{index + 1}</button>
              ))
            }
            <button onClick={() => updatePage(currentPage + 1)} className={`join-item btn ${(currentPage === totalPages || isLoading) ? "btn-disabled" : ""}`}>»</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenericTable
