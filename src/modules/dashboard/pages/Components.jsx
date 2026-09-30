import GenericTable from '~/components/GenericTable/index.jsx'
import GenericBtn from '~/components/GenericBtn/index.jsx'

function Components() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "company", label: "Job" },
        { key: "favoriteColor", label: "Favorite Color" },
    ]
    return (
        <>
            <GenericBtn text="Salemm" isDisabled={false} isLoading={true} />
            <GenericTable columns={columns} showCheckbox={true} />
        </>
    )
}

export default Components