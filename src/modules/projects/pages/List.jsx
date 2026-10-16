import GenericListing from "~/components/GenericListing";
import { useProjects } from "../hooks/index.js";
import { projectsColumns } from "~/app/constants/columns.js";
import { useNavigate } from "react-router";

function ProjectsList() {
    const { data: projectsData, isFetching: isLoading, refetch } = useProjects();
    let navigate = useNavigate();


    function onEditClick(item) {
        navigate(`/dashboard/projects/edit/${item.id}`);
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