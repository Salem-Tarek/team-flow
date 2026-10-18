import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useMemo } from 'react'
import { projectsFields as fields } from "~/app/constants/fields.js";
import { useUsers } from "~/modules/users/hooks/index.js";
import { useTeams } from "~/modules/teams/hooks/index.js";
import GenericForm from "~/components/form/GenericForm.jsx";
import { useProject, useCreateProject, useUpdateProject } from "../hooks/index.js";

function ProjectsAddEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState({});
    const [mode, setMode] = useState(params.id ? 'edit' : 'add');
    const { data: projectData, isFetching: isLoading } = useProject(params.id);
    const { mutate: createProject, isPending: isCreating } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const { data: teamsData } = useTeams();
    const { data: usersData } = useUsers();
    const projectsFieldsConfig = useMemo(() => {
        const users = usersData?.map(user => ({
            value: user.id,
            label: user.name,
        }))

        const teams = teamsData?.map(team => ({
            value: team.id,
            label: team.name,
        }))
        return fields(teams, users)
    }, [usersData, teamsData])

    useEffect(() => {
        setMode(params.id ? 'edit' : 'add');
        if (projectData) {
            setCurrentProject(projectData)
        }
    }, [params, projectData]);

    const handleFormSubmit = (data, { reset }) => {
        const options = {
            onSuccess: (res) => {
                alert(res.message);
                reset();
                navigate('/dashboard/projects')
            }
        }

        if (mode === 'edit') {
            updateProject({ id: params.id, data }, options);
        } else if (mode === 'add') {
            createProject(data, options);
        }
    }

    return (
        <div>
            <div className="bg-base-100 rounded-md p-4">
                <h1 className="mb-4 text-xl font-semibold">{mode === 'add' ? 'Add Project' : `Edit Project`}<span className="text-primary font-bold"> {currentProject.name}</span></h1>
                <GenericForm
                    fields={projectsFieldsConfig}
                    defaultValues={currentProject}
                    onSubmit={(data, { reset }) => handleFormSubmit(data, { reset })}
                    isPending={isLoading || isCreating || isUpdating}
                />
            </div>
        </div>
    )
}
export default ProjectsAddEdit