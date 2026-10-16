import GenericListing from "~/components/GenericListing";
import { useTasks, useCreateTask } from "../hooks/index.js";
import { tasksColumns } from "~/app/constants/columns.js";
import { useUsers } from "~/modules/users/hooks";
import { useProjects } from "~/modules/projects/hooks";
import { useMemo, useState } from "react";
import { taskFields as fields } from "~/app/constants/fields.js";

function TasksList() {
    const { data: tasksData, isFetching: isLoading, refetch } = useTasks();
    const { data: usersData } = useUsers();
    const { data: projectsData } = useProjects();
    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const [selectedTask, setSelectedTask] = useState({})
    const [mode, setMode] = useState('edit')
    const [formKey, setFormKey] = useState(0);

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

    function onDeleteClick(item) {
        alert(`Delete Click - ${item?.id}`)
    }

    function onViewClick(item) {
        alert(`View Click - ${item?.id}`)
    }

    function onSubmitForm(data, { reset }) {
        createTask(data, {
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
                onViewClick={(item) => onViewClick(item)}
                onSubmitForm={(data, { reset }) => onSubmitForm(data, { reset })}
                onRefresh={() => refetch()}
                isLoading={isLoading || isCreating}
            >
            </GenericListing>
        </div>
    )
}

export default TasksList