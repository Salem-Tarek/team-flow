import GenericListing from "~/components/GenericListing";
import { useTeams, useCreateTeam, useUpdateTeam, useDeleteTeam } from "../hooks/index.js";
import { teamsColumns } from "~/app/constants/columns.js";
import { teamsFields as fields } from "~/app/constants/fields.js";
import { useState, useMemo } from "react";
import { useUsers } from "~/modules/users/hooks/index.js";
import { useConfirmStore } from "~/stores/confirmStore.js";
import useNotificationsStore from "~/stores/notificationsStore.js";

function TeamsList() {
    const { data: teamsData, isFetching: isLoading, refetch } = useTeams();
    const { data: usersData } = useUsers();
    const { mutate: createTeam, isPending: isCreating } = useCreateTeam();
    const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();
    const [selectedTeam, setSelectedTeam] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);
    const { confirm } = useConfirmStore();
    const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();

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
                    addSuccessNotification(res.message)
                },
                onError: (error) => {
                    addErrorNotification(error.message)
                }
            })
        }
    }

    function onSubmitForm(data, { reset }) {
        const options = {
            onSuccess: (res) => {
                addSuccessNotification(res.message);
                reset();
            },
            onError: (error) => {
                addErrorNotification(error.message)
            },
            onSettled: () => {
                document.getElementById("addModal").close()
            }
        }
        if (mode === 'add') {
            createTeam(data, options)
        } else if (mode === 'edit') {
            updateTeam({ id: selectedTeam?.id, data }, options)
        }
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
                onSubmitForm={(data, { reset }) => onSubmitForm(data, { reset })}
                onRefresh={() => refetch()}
                isLoading={isLoading || isCreating || isUpdating || isDeleting}
            >
            </GenericListing>
        </div>
    )
}

export default TeamsList