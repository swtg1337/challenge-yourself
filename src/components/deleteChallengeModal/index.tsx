import React from 'react'
import Modal from '../modal'
import './deleteChallengeModal.style.pcss'

interface DeleteChallengeModalProps {
    isOpen: boolean
    onClose: () => void
    onDeleteConfirm: () => void
    challengeId: string | null
}

const DeleteChallengeModal: React.FC<DeleteChallengeModalProps> = ({ isOpen, onClose, onDeleteConfirm, challengeId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {challengeId && (
                <>
                    <h3>Вы уверены, что хотите удалить этот челлендж?</h3>
                    <div className="modal-buttons">
                        <button className="modal-button confirm" onClick={onDeleteConfirm}>Да, удалить</button>
                        <button className="modal-button cancel" onClick={onClose}>Отмена</button>
                    </div>
                </>
            )}
        </Modal>
    )
}

export default DeleteChallengeModal
