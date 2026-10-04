import GenericTable from '~/components/GenericTable/index.jsx'
import GenericBtn from '~/components/GenericBtn/index.jsx'
import GenericModal from '~/components/Modals/index.jsx'

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

    function handleSubmitModal(e) {
        e.preventDefault();
        alert("submit");
        document.getElementById("testtModal").close();
    }

    const columns = [
        { key: "name", label: "Name" },
        { key: "company", label: "Job" },
        { key: "favoriteColor", label: "Favorite Color" },
        { key: "actions", label: "", actions: ['edit', 'view', 'delete'] },
    ]
    return (
        <>
            <GenericBtn onClick={() => document.getElementById("testtModal").showModal()} text="Salemm" isDisabled={false} isLoading={false} />
            <GenericModal
                modalId="testtModal"
                modalHeader="Test Modal"
                footer={
                    <>
                        <GenericBtn text="Cancel" className="btn-sm brn-soft" />
                        <GenericBtn onClick={(e) => handleSubmitModal(e)} className="btn-sm brn-soft btn-error" text="Submit" />
                    </>
                }>

                {/* <h1>Hello Modal</h1> */}
            </GenericModal>
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