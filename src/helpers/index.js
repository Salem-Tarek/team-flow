export function showCloseAddEditModal(isClose = false) {
    if (document.getElementById("addModal")) {
        if (isClose) {
            document.getElementById("addModal").close()
        } else {
            document.getElementById("addModal").showModal()
        }
    }
}