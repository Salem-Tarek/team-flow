import GenericListing from "~/components/GenericListing";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "../hooks/index.js";
import { tasksColumns } from "~/app/constants/columns.js";
import { useUsers } from "~/modules/users/hooks";
import { useProjects } from "~/modules/projects/hooks";
import { useMemo, useState } from "react";
import { taskFields as fields } from "~/app/constants/fields.js";
import { useConfirmStore } from "~/stores/confirmStore.js";

function TasksList() {
    const { data: tasksData, isFetching: isLoading, refetch } = useTasks();
    const { data: usersData } = useUsers();
    const { data: projectsData } = useProjects();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
    const [selectedTask, setSelectedTask] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);
    const { confirm } = useConfirmStore();
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

    const tasksFieldsConfig = useMemo(() => {
        const users = usersData?.map(user => ({
            value: user.id,
            label: user.name,
        }))
        const projects = projectsData?.map(project => ({
            value: project.id,
            label: project.name,
        }))
        return fields(projects, users)
    }, [usersData, projectsData])

    const modalHeaderText = mode === 'edit' ? 'Edit Task' : 'Add Task';

    function addBtnClick() {
        setMode('add')
        setSelectedTask({})
        setFormKey((k) => k + 1);
        document.getElementById("addModal").showModal()
    }

    function onEditClick(item) {
        setSelectedTask(item)
        setMode('edit')
        setFormKey((k) => k + 1);
        document.getElementById("addModal").showModal()
    }

    async function onDeleteClick(item) {
        const ok = await confirm({
            modalHeader: 'Delete Task',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Task <span className="text-error font-bold">{item.title}</span> ?
                </>,
        });

        if (ok) {
            deleteTask(item.id, {
                onSuccess: (res) => {
                    alert(res.message);
                }
            })
        }
    }

    function onSubmitForm(data, { reset }) {
        const options = {
            onSuccess: (res) => {
                alert(res.message);
                reset();
                document.getElementById("addModal").close()
            }
        }

        if (mode === 'add') {
            createTask(data, options)
        } else if (mode === 'edit') {
            updateTask({ id: selectedTask?.id, data }, options)
        }
    }

    return (
        <div>
            <GenericListing
                formKey={formKey}
                title="Tasks List"
                addBtnText="Add Task"
                modalHeaderText={modalHeaderText}
                onAddClick={() => addBtnClick()}
                columns={tasksColumns}
                initialData={tasksData}
                defaultValues={selectedTask}
                fields={tasksFieldsConfig}
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

export default TasksList