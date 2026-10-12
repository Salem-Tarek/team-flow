import GenericListing from "~/components/GenericListing";
import { useUsers, useCreateUser } from "../hooks/index.js";
import { usersColumns } from "~/app/constants/columns.js";
import { usersFields as fields } from "~/app/constants/fields.js";
import { useState, useMemo } from 'react'
import { useTeams } from "~/modules/teams/hooks/index.js";

function UsersList() {
    const { data: usersData, isFetching: isLoading, refetch } = useUsers();
    const { data: teamsData } = useTeams();
    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const [selectedUser, setSelectedUser] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);

    const usersFieldsConfig = useMemo(() => {
        const teams = teamsData?.map(team => ({
            value: team.id,
            label: team.name,
        }))
        return fields(mode, teams)
    }, [mode, teamsData])

    const modalHeaderText = mode === 'edit' ? 'Edit User' : 'Add User';

    function addBtnClick() {
        setMode('add')
        setSelectedUser({})
        setFormKey((k) => k + 1);
        document.getElementById("addModal").showModal()
    }

    function onEditClick(item) {
        setSelectedUser(item)
        setMode('edit')
        setFormKey((k) => k + 1);
        document.getElementById("addModal").showModal()
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

    return (
        <div>
            <GenericListing
                formKey={formKey}
                title="Users List"
                addBtnText="Add User"
                modalHeaderText={modalHeaderText}
                onAddClick={() => addBtnClick()}
                columns={usersColumns}
                initialData={usersData}
                defaultValues={selectedUser}
                fields={usersFieldsConfig}
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