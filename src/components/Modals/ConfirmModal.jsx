import GenericModal from './index.jsx'
import GenericBtn from '~/components/GenericBtn/index.jsx'
import { useConfirmStore } from "~/stores/confirmStore.js";

function ConfirmModal() {
    const { answer, modalHeader, message, confirmBtnText, cancelBtnText } = useConfirmStore();
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
