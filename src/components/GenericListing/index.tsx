import GenericBtn from "~/components/GenericBtn/index.tsx";
import GenericTable from "~/components/GenericTable/index.tsx";
import GenericForm from "~/components/form/GenericForm.jsx";
import GenericModal from "~/components/Modals/index.jsx";
import { Link } from "react-router-dom";
import { RefreshCcw, Plus } from "lucide-react";
import useAuthStore from "~/modules/auth/stores/authStore.js";
import type { Column, TableRowBasics } from '~/app/constants/types.ts'
import type { ReactNode } from 'react'

type GenericListingProps<T extends TableRowBasics> = {
    columns: Column<T>[],
    children?: ReactNode,
    initialData: T[],
    fields?: any[],
    defaultValues?: Record<string, any>,
    showCheckbox?: boolean,
    showActions?: boolean,
    onAddClick?: () => void,
    onRefresh?: () => void,
    onEditClick?: (value: T) => void,
    onDeleteClick?: (value: T) => void,
    onViewClick?: (value: T) => void,
    isLoading?: boolean,
    showAddNew?: boolean,
    currentPage?: number,
    totalPages?: number,
    totalItems?: number,
    onPageChange?: (value: number) => void,
    perPage?: number,
    onPerPageChange?: (value: number) => void,
    // TODO: Define the correct signature after converting GenericForm.
    onSubmitForm?: (...args: any[]) => void;
    formKey?: number,
    title: string,
    addBtnText?: string,
    modalHeaderText?: string,
    addBtnLink?: string,
}

function GenericListing<T extends TableRowBasics>({
    formKey,
    children,
    title,
    onAddClick,
    onRefresh,
    columns = [],
    initialData = [],
    showCheckbox = true,
    showActions = true,
    onEditClick,
    onDeleteClick,
    onViewClick,
    isLoading,
    showAddNew = true,
    fields = [],
    defaultValues = {},
    onSubmitForm,
    addBtnText = 'Add New',
    modalHeaderText = "Add New",
    addBtnLink = '',
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    onPageChange,
    perPage = 10,
    onPerPageChange,
}: GenericListingProps<T>) {

    const handleFormSubmit = (data: any, { reset }: { reset: () => void }) => {
        onSubmitForm?.(data, { reset })
    }


    const { isAdmin } = useAuthStore();

    return (

        <div className="bg-base-100 p-4 rounded-lg">
            <div className="flex justify-between flex-col gap-4 mb-4">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="flex gap-2 desktop:self-end">
                    <GenericBtn isDisabled={isLoading} text="Refresh" onClick={onRefresh} className="btn-sm brn-soft">
                        <RefreshCcw className={`duration-100! ${isLoading ? 'animate-spin' : ''}`} size={18} />
                    </GenericBtn>
                    {showAddNew && (
                        <>
                            {addBtnLink && isAdmin && (
                                <Link to={addBtnLink}>
                                    <GenericBtn isDisabled={isLoading} text={addBtnText} className="btn-sm brn-soft btn-primary">
                                        <Plus size={18} />
                                    </GenericBtn>
                                </Link>
                            )}
                            {!addBtnLink && isAdmin && (
                                <>
                                    <GenericBtn isDisabled={isLoading} text={addBtnText} onClick={onAddClick} className="btn-sm brn-soft btn-primary">
                                        <Plus size={18} />
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
                isAdmin={isAdmin}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={onPageChange}
                perPage={perPage}
                onPerPageChange={onPerPageChange}
            />
        </div>
    )
}

export default GenericListing