import GenericListing from "~/components/GenericListing";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "../hooks/index.js";
import { tasksColumns } from "~/app/constants/columns.js";
import { useUsers } from "~/modules/users/hooks";
import { useProjects } from "~/modules/projects/hooks";
import { useMemo, useState, useEffect, useCallback } from "react";
import { taskFields as fields } from "~/app/constants/fields.js";
import { useConfirmContext } from "~/app/providers/ConfirmationProvider.jsx";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { useSearchParams } from "react-router";
import { showCloseAddEditModal } from '~/helpers/index.js'

const EMPTY_ARRAY = [];

function TasksList() {
    const [pagination, setPagination] = useState({})
    const { setBreadcrumbItems } = useBreadcrumbStore()
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: tasksData, isFetching: isLoading, refetch } = useTasks({ page: pagination.page || 1, limit: pagination.limit || 10 });

    useEffect(() => {
        if (tasksData) {
            setPagination((prev) => ({
                ...prev,
                ...tasksData.pagination,
            }))
        }
    }, [tasksData])

    const { data: usersData } = useUsers({ all: true });
    const { data: projectsData } = useProjects({ all: true });
    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
    const [selectedTask, setSelectedTask] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);
    const { confirm } = useConfirmContext();
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();

    const tasksFieldsConfig = useMemo(() => {
        const users = usersData?.data?.map(user => ({
            value: user.id,
            label: user.name,
        }))
        const projects = projectsData?.data?.map(project => ({
            value: project.id,
            label: project.name,
        }))
        return fields(projects, users)
    }, [usersData, projectsData])

    const modalHeaderText = mode === 'edit' ? 'Edit Task' : 'Add Task';

    const addBtnClick = useCallback(() => {
        setMode('add')
        setSelectedTask({})
        setFormKey((k) => k + 1);
        showCloseAddEditModal()
    }, [])

    const onEditClick = useCallback((item) => {
        setSelectedTask(item)
        setMode('edit')
        setFormKey((k) => k + 1);
        showCloseAddEditModal()
    }, [])

    const onDeleteClick = useCallback(async (item) => {
        const ok = await confirm({
            modalHeader: 'Delete Task',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Task <span className="text-error font-bold">{item.title}</span>?
                </>,
        });

        if (ok) {
            deleteTask(item.id, {
                onSuccess: (res) => {
                    addSuccessNotification(res.message);
                },
                onError: (error) => {
                    addErrorNotification(error?.response?.data?.message || error?.message)
                }
            })
        }
    }, [confirm, deleteTask, addSuccessNotification, addErrorNotification])

    useEffect(() => {
        const isCreateTask = searchParams.get('createtask') === 'true';
        if (isCreateTask) {
            addBtnClick()
        }
        setBreadcrumbItems([
            { to: "/dashboard", label: "Dashboard" },
            { to: "/dashboard/tasks", label: "Tasks" }
        ])
    }, [])

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
            createTask(data, options)
        } else if (mode === 'edit') {
            updateTask({ id: selectedTask?.id, data }, options)
        }
    }, [addSuccessNotification, addErrorNotification, createTask, updateTask, selectedTask, mode])

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
                title="Tasks List"
                addBtnText="Add Task"
                modalHeaderText={modalHeaderText}
                onAddClick={addBtnClick}
                columns={tasksColumns}
                initialData={tasksData?.data || EMPTY_ARRAY}
                defaultValues={selectedTask}
                fields={tasksFieldsConfig}
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

export default TasksList