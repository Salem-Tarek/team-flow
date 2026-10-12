import GenericBtn from "~/components/GenericBtn/index.jsx";
import GenericTable from "~/components/GenericTable/index.jsx";
import GenericForm from "~/components/form/GenericForm.jsx";
import GenericModal from "~/components/Modals/index.jsx";

function GenericListing({ formKey, children, title, onAddClick, onRefresh, columns = [], initialData = [], showCheckbox = true, showActions = true, onEditClick, onDeleteClick, onViewClick, isLoading, showAddNew = true, fields = [], defaultValues = {}, onSubmitForm, addBtnText = 'Add New', modalHeaderText = "Add New" }) {

    const handleFormSubmit = (data, { reset }) => {
        onSubmitForm(data, { reset })
    }

    return (
        <div className="bg-base-100 p-4 rounded-lg">
            <div className="flex justify-between flex-col gap-4 mb-4">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="flex gap-2 desktop:self-end">
                    <GenericBtn isDisabled={isLoading} text="Refresh" onClick={onRefresh} className="btn-sm brn-soft">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C9.4095 4 7.10606 5.23053 5.64274 7.14274L8 9.5H2V3.5L4.21863 5.71863C6.05061 3.452 8.85558 2 12 2 17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20 14.5905 20 16.894 18.7695 18.3573 16.8573L16 14.5 22 14.5V20.5L19.7814 18.2814C17.9494 20.548 15.1444 22 12 22 6.47715 22 2 17.5228 2 12H4Z"></path></svg>
                    </GenericBtn>
                    {showAddNew && (
                        <>
                            <GenericBtn isDisabled={isLoading} text={addBtnText} onClick={onAddClick} className="btn-sm brn-soft btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
                            </GenericBtn>
                            <GenericModal
                                modalId="addModal"
                                modalHeader={modalHeaderText}
                                footer={
                                    <>
                                        <GenericBtn text="Cancel" className="btn-sm brn-soft" />
                                        <GenericBtn form="listingForm" className="btn-sm brn-soft btn-primary" text="Submit" />
                                    </>
                                }>
                                {children ? children : (
                                    <GenericForm
                                        key={formKey}
                                        fields={fields}
                                        defaultValues={defaultValues}
                                        onSubmit={(data, { reset }) => handleFormSubmit(data, { reset })}
                                        isPending={isLoading}
                                        showSubmitBtn={false}
                                    />
                                )}
                            </GenericModal>
                        </>
                    )}
                </div>
            </div>
            <GenericTable
                columns={columns}
                initialData={initialData}
                showCheckbox={showCheckbox}
                showActions={showActions}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                onViewClick={onViewClick}
                isLoading={isLoading}
            />
        </div>
    )
}

export default GenericListing