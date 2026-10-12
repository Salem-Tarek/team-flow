import GenericListing from "~/components/GenericListing";
import { useTeams, useCreateTeam } from "../hooks/index.js";
import { teamsColumns } from "~/app/constants/columns.js";
import { teamsFields as fields } from "~/app/constants/fields.js";
import { useState, useMemo } from "react";
import { useUsers } from "~/modules/users/hooks/index.js";

function TeamsList() {
    const { data: teamsData, isFetching: isLoading, refetch } = useTeams();
    const { data: usersData } = useUsers();
    const { mutate: createTeam, isPending: isCreating } = useCreateTeam();
    const [selectedTeam, setSelectedTeam] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);

    const teamsFieldsConfig = useMemo(() => {
        const users = usersData?.map(user => ({
            value: user.id,
            label: user.name,
        }))
        return fields(users)
    }, [usersData])

    const modalHeaderText = mode === 'edit' ? 'Edit Team' : 'Add Team';

    function addBtnClick() {
        setMode('add')
        setSelectedTeam({})
        setFormKey((k) => k + 1);
        document.getElementById("addModal").showModal()
    }

    function onEditClick(item) {
        setSelectedTeam(item)
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
        createTeam(data, {
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
                title="Teams List"
                addBtnText="Add Team"
                modalHeaderText={modalHeaderText}
                onAddClick={() => addBtnClick()}
                columns={teamsColumns}
                initialData={teamsData}
                defaultValues={selectedTeam}
                fields={teamsFieldsConfig}
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

export default TeamsList