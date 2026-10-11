import GenericListing from "~/components/GenericListing";
import { useUsers, useCreateUser } from "../hooks/index.js";
import { usersColumns } from "~/app/constants/columns.js";
import { usersFields as fields } from "~/app/constants/fields.js";

function UsersList() {
    const { data: usersData, isFetching: isLoading, refetch } = useUsers();
    const { mutate: createUser, isPending: isCreating } = useCreateUser();

    function onEditClick(item) {
        alert(`Edit Click - ${item?.id}`)
    }

    function onDeleteClick(item) {
        alert(`Delete Click - ${item?.id}`)
    }

    function onViewClick(item) {
        alert(`View Click - ${item?.id}`)
    }

    function onSubmitForm(data, { reset }) {
        createUser(data, {
            onSuccess: (res) => {
                alert(res.message);
                reset();
                document.getElementById("addModal").close()
            }
        })
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
                onSubmitForm={(data, { reset }) => onSubmitForm(data, { reset })}
                onRefresh={() => refetch()}
                isLoading={isLoading || isCreating}
            >
            </GenericListing>
        </div>
    )
}

export default UsersList