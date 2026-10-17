import GenericListing from "~/components/GenericListing";
import { useProjects, useDeleteProject } from "../hooks/index.js";
import { projectsColumns } from "~/app/constants/columns.js";
import { useNavigate } from "react-router";
import { useConfirmStore } from "~/stores/confirmStore.js";

function ProjectsList() {
    const { data: projectsData, isFetching: isLoading, refetch } = useProjects();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    let navigate = useNavigate();
    const { confirm } = useConfirmStore();

    function onEditClick(item) {
        navigate(`/dashboard/projects/edit/${item.id}`);
    }

    async function onDeleteClick(item) {
        const ok = await confirm({
            modalHeader: 'Delete Project',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Project <span className="text-error font-bold">{item.name}</span> ?
                </>,
        });

        if (ok) {
            deleteProject(item.id, {
                onSuccess: (res) => {
                    alert(res.message);
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
                title="Projects List"
                addBtnText="Add Project"
                columns={projectsColumns}
                initialData={projectsData}
                showCheckbox={true}
                showActions={true}
                onEditClick={(item) => onEditClick(item)}
                onDeleteClick={(item) => onDeleteClick(item)}
                onViewClick={(item) => onViewClick(item)}
                onSubmitForm={(data, { reset }) => onSubmitForm(data, { reset })}
                onRefresh={() => refetch()}
                isLoading={isLoading}
                addBtnLink="/dashboard/projects/add"
            >
            </GenericListing>
        </div>
    )
}

export default ProjectsList