import { create } from "zustand";

export const useConfirmStore = create((set, get) => ({
    // State
    modalHeader: '',
    message: '',
    confirmBtnText: '',
    cancelBtnText: '',
    resolved: null,

    // Actions
    confirm: ({ modalHeader = "Confirm Modal", message, confirmBtnText = "Confirm", cancelBtnText = "Cancel" }) => {
        if (document.getElementById("confirmModal")) {
            document.getElementById("confirmModal").showModal();
        }
        return new Promise((resolve) => set({ modalHeader, message, resolve, confirmBtnText, cancelBtnText }));
    },

    answer: (value) => {
        if (document.getElementById("confirmModal")) {
            document.getElementById("confirmModal").close();
        }
        get().resolve?.(value);
        set({ resolved: null });
    }
}))