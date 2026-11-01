import { useContext, createContext, useState, useEffect } from 'react'

const ConfirmationContext = createContext(null)

export function ConfirmProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const [confirmModalData, setConfirmModalData] = useState({
        modalHeader: '',
        message: '',
        confirmBtnText: '',
        cancelBtnText: '',
        resolve: null,
    })

    // Actions
    const confirm = ({ modalHeader = "Confirm Modal", message, confirmBtnText = "Confirm", cancelBtnText = "Cancel" }) => {
        // if (document.getElementById("confirmModal")) {
        //     document.getElementById("confirmModal").showModal();
        // }
        return new Promise((resolve) => {
            setConfirmModalData({ modalHeader, message, resolve, confirmBtnText, cancelBtnText })
            setIsOpen(true)
        });
    }

    const answer = (value) => {
        const modal = document.getElementById("confirmModal")

        if (modal?.open) {
            modal.close()
        }

        confirmModalData?.resolve?.(value)

        setConfirmModalData(prev => ({ ...prev, resolve: null }))
        setIsOpen(false)
    }

    useEffect(() => {
        const modal = document.getElementById("confirmModal")

        if (modal && isOpen) {
            modal.showModal()
        }
    }, [isOpen, confirmModalData])

    return (
        <ConfirmationContext.Provider value={{ ...confirmModalData, confirm, answer }}>
            {children}
        </ConfirmationContext.Provider>
    )
}

export function useConfirmContext() {
    return useContext(ConfirmationContext);
}