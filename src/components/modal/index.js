import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import "./index.css"
function Modal({ okText = "确定", open = true, onClose, children }) {
  const close = () => {
    onClose()
  }
  useEffect(() => {
    setIsOpen(open)
  }, [open])
  const [isOpen, setIsOpen] = useState(open)
  const el = (
    <div className={`cu-modal ${isOpen ? "" : "hidden"}`}>
      <div className="modal-mask"></div>
      <div className="modal-content-wrap">
        <div className="modal-content">
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="ok-btn" onClick={close}>
              {okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  return createPortal(el, document.body)
}

export default Modal
