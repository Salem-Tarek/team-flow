import GenericListing from "~/components/GenericListing";
import { useTeams, useCreateTeam } from "../hooks/index.js";
import { teamsColumns } from "~/app/constants/columns.js";
import { teamsFields as fields } from "~/app/constants/fields.js";

function TeamsList() {
    const { data: teamsData, isFetching: isLoading, refetch } = useTeams();
    const { mutate: createTeam, isPending: isCreating } = useCreateTeam();


    function onEditClick(item) {
        alert(`Edit Click - ${item?.id}`)
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

    function addBtnClick() {
        document.getElementById("addModal").showModal()
    }
    return (
        <div>
            <GenericListing
                title="Teams List"
                addBtnText="Add Team"
                modalHeaderText="Add New Team"
                onAddClick={() => addBtnClick()}
                columns={teamsColumns}
                initialData={teamsData}
                fields={fields}
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