import GenericListing from "~/components/GenericListing";
import { useUsers } from "../hooks/index.js";
import { usersColumns } from "~/app/constants/columns.js";
import { usersFields as fields } from "~/app/constants/fields.js";

function UsersList() {
    const { data: usersData, isFetching: isLoading, refetch } = useUsers();

    function onEditClick(item) {
        alert(`Edit Click - ${item?.id}`)
    }

    function onDeleteClick(item) {
        alert(`Delete Click - ${item?.id}`)
    }

    function onViewClick(item) {
        alert(`View Click - ${item?.id}`)
    }

    function onSubmitForm(data) {
        alert("data")
        console.log("data")
        console.log(data)
    }

    function addBtnClick() {
        document.getElementById("addModal").showModal()
    }
    return (
        <div>
            <GenericListing
                title="Users List"
                addBtnText="Add User"
                modalHeaderText="Add New User"
                onAddClick={() => addBtnClick()}
                columns={usersColumns}
                initialData={usersData}
                fields={fields}
                showCheckbox={true}
                showActions={true}
                onEditClick={(item) => onEditClick(item)}
                onDeleteClick={(item) => onDeleteClick(item)}
                onViewClick={(item) => onViewClick(item)}
                onSubmitForm={(data) => onSubmitForm(data)}
                onRefresh={() => refetch()}
                isLoading={isLoading}
            >
            </GenericListing>
        </div>
    )
}

export default UsersList