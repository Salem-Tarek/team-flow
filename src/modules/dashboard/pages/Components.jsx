import GenericTable from '~/components/GenericTable/index.jsx'
import GenericBtn from '~/components/GenericBtn/index.jsx'

function Components() {
    function onEditClick(item) {
        alert(`Edit Click - ${item?.id}`)
    }

    function onDeleteClick(item) {
        alert(`Delete Click - ${item?.id}`)
    }

    function onViewClick(item) {
        alert(`View Click - ${item?.id}`)
    }

    const columns = [
        { key: "name", label: "Name" },
        { key: "company", label: "Job" },
        { key: "favoriteColor", label: "Favorite Color" },
        { key: "actions", label: "", actions: ['edit', 'view', 'delete'] },
    ]
    return (
        <>
            <GenericBtn text="Salemm" isDisabled={false} isLoading={true} />
            <GenericTable
                columns={columns}
                showCheckbox={true}
                showActions={true}
                onEditClick={(item) => onEditClick(item)}
                onDeleteClick={(item) => onDeleteClick(item)}
                onViewClick={(item) => onViewClick(item)}
            />
        </>
    )
}

export default Components