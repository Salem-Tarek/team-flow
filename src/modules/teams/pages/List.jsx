import GenericListing from "~/components/GenericListing";
import { useTeams, useCreateTeam, useUpdateTeam, useDeleteTeam } from "../hooks/index.js";
import { teamsColumns } from "~/app/constants/columns.js";
import { teamsFields as fields } from "~/app/constants/fields.js";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useUsers } from "~/modules/users/hooks/index.js";
import { useConfirmContext } from "~/app/providers/ConfirmationProvider.jsx";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { showCloseAddEditModal } from '~/helpers/index.js'

const EMPTY_ARRAY = [];

function TeamsList() {
    const [pagination, setPagination] = useState({})
    const { setBreadcrumbItems } = useBreadcrumbStore()
    useEffect(() => {
        setBreadcrumbItems([
            { to: "/dashboard", label: "Dashboard" },
            { to: "/dashboard/teams", label: "Teams" }
        ])
    }, [])


    const { data: teamsData, isFetching: isLoading, refetch } = useTeams({ page: pagination.page || 1, limit: pagination.limit || 10 });


    useEffect(() => {
        if (teamsData) {
            setPagination((prev) => ({
                ...prev,
                ...teamsData.pagination,
            }))
        }
    }, [teamsData])

    const { data: usersData } = useUsers({ all: true });
    const { mutate: createTeam, isPending: isCreating } = useCreateTeam();
    const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();
    const [selectedTeam, setSelectedTeam] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);
    const { confirm } = useConfirmContext();
    const { mutate: deleteTeam, isPending: isDeleting } = useDeleteTeam();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();

    const teamsFieldsConfig = useMemo(() => {
        const users = usersData?.data?.map(user => ({
            value: user.id,
            label: user.name,
        }))
        return fields(users)
    }, [usersData])

    const modalHeaderText = mode === 'edit' ? 'Edit Team' : 'Add Team';

    const addBtnClick = useCallback(() => {
        setMode('add')
        setSelectedTeam({})
        setFormKey((k) => k + 1);
        showCloseAddEditModal()
    }, [])

    const onEditClick = useCallback((item) => {
        setSelectedTeam(item)
        setMode('edit')
        setFormKey((k) => k + 1);
        showCloseAddEditModal()
    }, [])

    const onDeleteClick = useCallback(async (item) => {
        const ok = await confirm({
            modalHeader: 'Delete Team',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Team <span className="text-error font-bold">{item.name}</span>?
                </>,
        });

        if (ok) {
            deleteTeam(item.id, {
                onSuccess: (res) => {
                    addSuccessNotification(res.message)
                },
                onError: (error) => {
                    addErrorNotification(error?.response?.data?.message || error?.message)
                }
            })
        }
    }, [confirm, deleteTeam, addSuccessNotification, addErrorNotification])

    const onSubmitForm = useCallback((data, { reset }) => {
        const options = {
            onSuccess: (res) => {
                addSuccessNotification(res.message);
                reset();
            },
            onError: (error) => {
                addErrorNotification(error?.response?.data?.message || error?.message)
            },
            onSettled: () => {
                showCloseAddEditModal(true)
            }
        }
        if (mode === 'add') {
            createTeam(data, options)
        } else if (mode === 'edit') {
            updateTeam({ id: selectedTeam?.id, data }, options)
        }
    }, [addSuccessNotification, addErrorNotification, createTeam, updateTeam, selectedTeam, mode])

    const handlePageChange = useCallback((newPage) => {
        setPagination((prev) => ({
            ...prev,
            page: newPage,
        }))
    }, [])

    const handlePerPageChange = useCallback((newLimit) => {
        setPagination((prev) => ({
            ...prev,
            limit: newLimit,
            page: 1,
        }))
    }, [])

    return (
        <div>
            <GenericListing
                formKey={formKey}
                title="Teams List"
                addBtnText="Add Team"
                modalHeaderText={modalHeaderText}
                onAddClick={addBtnClick}
                columns={teamsColumns}
                initialData={teamsData?.data || EMPTY_ARRAY}
                defaultValues={selectedTeam}
                fields={teamsFieldsConfig}
                showCheckbox={true}
                showActions={true}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                onSubmitForm={onSubmitForm}
                onRefresh={refetch}
                isLoading={isLoading || isCreating || isUpdating || isDeleting}
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                onPageChange={handlePageChange}
                perPage={pagination.limit}
                onPerPageChange={handlePerPageChange}
            >
            </GenericListing>
        </div>
    )
}

export default TeamsList