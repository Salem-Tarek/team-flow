import { useState, useEffect, useRef } from "react"

const initialData = [
    {
        id: 1,
        name: "Hart Hagerty",
        country: "United States",
        avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
        company: "Zemlak, Daniel and Leannon",
        role: "Desktop Support Technician",
        favoriteColor: "Purple",
        checked: false,
    },
    {
        id: 2,
        name: "Brice Swyre",
        country: "China",
        avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
        company: "Carroll Group",
        role: "Tax Accountant",
        favoriteColor: "Red",
        checked: false,
    },
    {
        id: 3,
        name: "Marjy Ferencz",
        country: "Russia",
        avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
        company: "Rowe-Schoen",
        role: "Office Assistant I",
        favoriteColor: "Crimson",
        checked: false,
    },
    {
        id: 4,
        name: "Yancy Tear",
        country: "Brazil",
        avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
        company: "Wyman-Ledner",
        role: "Community Outreach Specialist",
        favoriteColor: "Indigo",
        checked: false,
    }
];

function GenericTable() {
    const [data, setData] = useState(initialData)
    const checkAll = data.length > 0 && data.every((item) => item.checked)
    const isIntermediate = data.some((item) => item.checked) && data.some((item) => !item.checked)
    const checkAllCheckbox = useRef(null)


    function handleCheckAll(isChecked) {
        toggleCheckAll(isChecked)
    }

    function toggleCheckAll(isChecked) {
        const updatedData = data.map((item) => {
            return { ...item, checked: isChecked }
        })
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
        if (isIntermediate) {
            checkAllCheckbox.current.indeterminate = true
        } else {
            checkAllCheckbox.current.indeterminate = false
        }
    }, [isIntermediate])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input ref={checkAllCheckbox} checked={checkAll} onChange={(e) => handleCheckAll(e.target.checked)} type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <th>
                                <label>
                                    <input checked={item.checked} onChange={() => handleCheck(item.id)} type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">{item.name}</div>
                                        <div className="text-sm opacity-50">{item.country}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.company}
                            </td>
                            <td>{item.favoriteColor}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GenericTable