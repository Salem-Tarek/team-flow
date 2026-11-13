import GenericModal from './index.jsx'
import GenericBtn from '~/components/GenericBtn/index.tsx'
import { useConfirmContext } from "~/app/providers/ConfirmationProvider.jsx";

function ConfirmModal() {
    const { answer, modalHeader, message, confirmBtnText, cancelBtnText } = useConfirmContext();
    return (
        <GenericModal
            modalId="confirmModal"
            modalHeader={modalHeader}
            footer={
                <>
                    <GenericBtn onClick={() => answer(false)} text={cancelBtnText} className="btn-sm brn-soft" />
                    <GenericBtn onClick={() => answer(true)} className="btn-sm brn-soft btn-error" text={confirmBtnText} />
                </>
            }>
            <div className='mt-4'>{message}</div>
        </GenericModal>
    )
}

export default ConfirmModal
