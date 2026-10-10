import { useState, useEffect } from "react";
import GenericListing from "~/components/GenericListing";
import axiosClient from "~/lib/axios"

function UsersList() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    function onEditClick(item) {
        alert(`Edit Click - ${item?.id}`)
    }

    function onDeleteClick(item) {
        alert(`Delete Click - ${item?.id}`)
    }

    function onViewClick(item) {
        alert(`View Click - ${item?.id}`)
    }

    function refreshData() {
        setIsLoading(true)
        axiosClient.get('/users')
            .then(res => {
                console.log("res")
                console.log(res)
            })
            .catch(err => {
                console.log("err")
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
        // setIsLoading(true)
        // setTimeout(() => {
        //     setIsLoading(false)
        //     // alert("Refresh")
        // }, 3000)
    }

    const columns = [
        { key: "name", label: "Name" },
        { key: "company", label: "Job" },
        { key: "favoriteColor", label: "Favorite Color" },
        { key: "actions", label: "", actions: ['edit', 'view', 'delete'] },
    ]

    function addUserClick() {
        document.getElementById("addUserModal").showModal()
    }
    return (
        <div>
            <GenericListing
                title="Users List"
                onAddClick={() => addUserClick()}
                columns={columns}
                showCheckbox={true}
                showActions={true}
                onEditClick={(item) => onEditClick(item)}
                onDeleteClick={(item) => onDeleteClick(item)}
                onViewClick={(item) => onViewClick(item)}
                onRefresh={() => refreshData()}
                isLoading={isLoading}
            >
                <form action="">
                    <fieldset className="fieldset">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" className="input w-full!" placeholder="Name" />
                        </div>
                        <div>
                            <label className="label">Company</label>
                            <input type="text" className="input w-full!" placeholder="Company" />
                        </div>
                        <div>
                            <label className="label">Job</label>
                            <input type="text" className="input w-full!" placeholder="Job" />
                        </div>
                        <div>
                            <label className="label">Favorite Color</label>
                            <input type="color" className="input w-full!" placeholder="Favorite Color" />
                        </div>
                    </fieldset>
                </form>
            </GenericListing>
        </div>
    )
}

export default UsersList