import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTenantAsync, getSingleTenantAsync, updateTenantAsync } from '../../redux/tenants/thunks';
import DeleteConfirmationModal from '../property/DeleteConfirmationModal';
import InputFormModal from '../../shared/components/InputFormModal';
import { Tables } from '../../shared/constants/Tables';
import { RequiredFields } from '../../shared/constants/tenant/RequiredFields';
import HomeButton from '../../shared/components/HomeButton';

function TenantProfileCard({ tenant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteModalContent = (
    <div>
      <p>
        You are about to delete the tenant {tenant.firstName} {tenant.lastName}. This action cannot be undone.
      </p>
      <p>Before proceeding, please consider the following:</p>
      <p>All data associated with this tenant will be deleted, including lease agreement, payment history, etc.</p>
      <p>The tenant will be removed from any properties it is registered under.</p>
      <p>Are you sure you want to proceed with this deletion?</p>
    </div>
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { firstName, lastName, phoneNumber, email, birthDate, occupation } = tenant;
  const editTenant = { firstName, lastName, phoneNumber, email, birthDate, occupation };

  const handleEditTenant = () => {
    if (!editTenant.propertyId || editTenant.propertyId !== tenant.propertyId) {
      editTenant.propertyId = tenant.propertyId;
    }

    Object.keys(tenant).forEach((field) => {
      if (!editTenant[field]) {
        editTenant[field] = tenant[field];
      }
    });

    console.log('editTenant: ', editTenant);

    dispatch(updateTenantAsync(editTenant)).then(() => {
      dispatch(getSingleTenantAsync(editTenant._id));
      setIsEditModalOpen(false);
    });
  };

  const handleDelete = () => {
    dispatch(deleteTenantAsync(tenant._id));
    navigate(`/properties/${tenant.propertyId}`);
  };

  return (
    <div className='card-body text-center'>
      <h5 className='my-3'>
        {tenant.firstName} {tenant.lastName}
      </h5>
      <img
        src='https://cdn-icons-png.flaticon.com/512/65/65581.png'
        alt='avatar'
        className='rounded-circle img-fluid'
        style={{ width: '150px' }}
      />
      <div className='d-flex justify-content-center mt-3 mb-2'>
        <HomeButton />
        <button className='btn btn-outline-primary ms-1' type='button' onClick={() => setIsEditModalOpen(true)}>
          Edit
        </button>
        <button className='btn btn-outline-danger ms-1' type='button' onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </button>
      </div>
      {isEditModalOpen && (
        <InputFormModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          type={Tables.Tenant}
          object={editTenant}
          requiredFields={RequiredFields}
          onSubmit={handleEditTenant}
          isEdit
        />
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        type='tenant'
        modalContent={deleteModalContent}
      />
    </div>
  );
}

// https://mdbootstrap.com/docs/standard/extended/profiles/

export default TenantProfileCard;
