
function GenericModal({ modalHeader = 'Modal Header', footer, children, modalId = "defaultModal" }) {

    return (
        <>
            {/* <button className="btn" onClick={() => document.getElementById(modalId).showModal()}>open modal</button> */}
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    {/* Header */}
                    <form method="dialog" className="flex justify-between items-center gap-2">
                        <h3 className="text-base font-semibold">{modalHeader}</h3>
                        <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
                    </form>

                    {/* Content */}
                    {children ? (children) : (
                        <div className="py-4">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p>Press ESC key or click outside to close</p>
                        </div>
                    )}

                    {/* Footer */}
                    <form method="dialog">
                        <div className="mt-4 flex justify-end gap-2">
                            {footer ? footer : (<button className="btn">close</button>)}
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default GenericModal