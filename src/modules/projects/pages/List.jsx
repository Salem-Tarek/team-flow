import GenericListing from "~/components/GenericListing";
import { useProjects, useDeleteProject } from "../hooks/index.js";
import { projectsColumns } from "~/app/constants/columns.js";
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { useConfirmStore } from "~/stores/confirmStore.js";
import useNotificationsStore from "~/stores/notificationsStore.js";

function ProjectsList() {
    const [pagination, setPagination] = useState({})

    const { data: projectsData, isFetching: isLoading, refetch } = useProjects({ page: pagination.page, limit: pagination.limit });

    useEffect(() => {
        if (projectsData) {
            setPagination((prev) => ({
                ...prev,
                ...projectsData.pagination,
            }))
        }
    }, [projectsData])

    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    let navigate = useNavigate();
    const { confirm } = useConfirmStore();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();

    function onEditClick(item) {
        navigate(`/dashboard/projects/edit/${item.id}`);
    }

    async function onDeleteClick(item) {
        const ok = await confirm({
            modalHeader: 'Delete Project',
            confirmBtnText: 'Delete',
            message:
                <>
                    Are you sure you want to delete Project <span className="text-error font-bold">{item.name}</span>?
                </>,
        });

        if (ok) {
            deleteProject(item.id, {
                onSuccess: (res) => {
                    addSuccessNotification(res.message);
                },
                onError: (error) => {
                    addErrorNotification(error.message)
                }
            })
        }
    }

    function onViewClick(item) {
        navigate(`/dashboard/projects/${item.id}`);
    }

    function onSubmitForm(data, { reset }) {
        createTeam(data, {
            onSuccess: (res) => {
                addSuccessNotification(res.message);
                reset();
                document.getElementById("addModal").close()
            },
            onError: (error) => {
                addErrorNotification(error.message)
            }
        })
    }

    function handlePageChange(newPage) {
        setPagination((prev) => ({
            ...prev,
            page: newPage,
        }))
    }

    function handlePerPageChange(newLimit) {
        setPagination((prev) => ({
            ...prev,
            limit: newLimit,
            page: 1,
        }))
    }

    return (
        <div>
            <GenericListing
                title="Projects List"
                addBtnText="Add Project"
                columns={projectsColumns}
                initialData={projectsData?.data || []}
                showCheckbox={true}
                showActions={true}
                onEditClick={(item) => onEditClick(item)}
                onDeleteClick={(item) => onDeleteClick(item)}
                onViewClick={(item) => onViewClick(item)}
                onSubmitForm={(data, { reset }) => onSubmitForm(data, { reset })}
                onRefresh={() => refetch()}
                isLoading={isLoading || isDeleting}
                addBtnLink="/dashboard/projects/add"
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                onPageChange={(newPage) => handlePageChange(newPage)}
                perPage={pagination.limit}
                onPerPageChange={(newLimit) => handlePerPageChange(newLimit)}
            >
            </GenericListing>
        </div>
    )
}

export default ProjectsList