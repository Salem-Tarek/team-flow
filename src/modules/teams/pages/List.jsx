import GenericListing from "~/components/GenericListing";
import { useTeams, useCreateTeam, useDeleteTeam } from "../hooks/index.js";
import { teamsColumns } from "~/app/constants/columns.js";
import { teamsFields as fields } from "~/app/constants/fields.js";
import { useState, useMemo } from "react";
import { useUsers } from "~/modules/users/hooks/index.js";
import { useConfirmStore } from "~/stores/confirmStore.js";

function TeamsList() {
    const { data: teamsData, isFetching: isLoading, refetch } = useTeams();
    const { data: usersData } = useUsers();
    const { mutate: createTeam, isPending: isCreating } = useCreateTeam();
    const [selectedTeam, setSelectedTeam] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);
    const { confirm } = useConfirmStore();
    const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();

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

    async function onDeleteClick(item) {
        const ok = await confirm({
            modalHeader: 'Delete Team',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Team <span className="text-error font-bold">{item.name}</span> ?
                </>,
        });

        if (ok) {
            deleteTeam(item.id, {
                onSuccess: (res) => {
                    alert(res.message)
                }
            })
        }
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