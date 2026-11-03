import GenericListing from "~/components/GenericListing";
import { useProjects, useDeleteProject } from "../hooks/index.js";
import { projectsColumns } from "~/app/constants/columns.js";
import { useNavigate } from "react-router";
import { useState, useEffect, useCallback } from 'react';
import { useConfirmContext } from "~/app/providers/ConfirmationProvider.jsx";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { showCloseAddEditModal } from '~/helpers/index.js'

const EMPTY_ARRAY = [];

function ProjectsList() {
    const [pagination, setPagination] = useState({})
    const { setBreadcrumbItems } = useBreadcrumbStore()
    useEffect(() => {
        setBreadcrumbItems([
            { to: "/dashboard", label: "Dashboard" },
            { to: "/dashboard/projects", label: "Projects" }
        ])
    }, [])

    const { data: projectsData, isFetching: isLoading, refetch } = useProjects({ page: pagination?.page || 1, limit: pagination?.limit || 10 });

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
    const { confirm } = useConfirmContext();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();

    function onEditClick(item) {
        navigate(`/dashboard/projects/edit/${item.id}`);
    }

    const onDeleteClick = useCallback(async (item) => {
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
                    addErrorNotification(error?.response?.data?.message || error?.message)
                }
            })
        }
    }, [confirm, deleteProject, addSuccessNotification, addErrorNotification])


    const onViewClick = useCallback((item) => {
        navigate(`/dashboard/projects/${item.id}`);
    }, [])

    const onSubmitForm = useCallback((data, { reset }) => {
        createTeam(data, {
            onSuccess: (res) => {
                addSuccessNotification(res.message);
                reset();
                showCloseAddEditModal(true)
            },
            onError: (error) => {
                addErrorNotification(error?.response?.data?.message || error?.message)
            }
        })
    }, [])

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
                title="Projects List"
                addBtnText="Add Project"
                columns={projectsColumns}
                initialData={projectsData?.data || EMPTY_ARRAY}
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