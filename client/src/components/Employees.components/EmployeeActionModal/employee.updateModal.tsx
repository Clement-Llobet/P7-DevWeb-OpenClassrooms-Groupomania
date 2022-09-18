import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ModifyModerationForm } from './employeeModalStyle';

interface IUpdateEmployeeModal {
  showUpdateAndDeleteButtons: boolean;
  setShowUpdateAndDeleteButtons: any;
  moderationSetter: React.Dispatch<React.SetStateAction<number | null>>;
}

const UpdateEmployeeModal: React.FC<IUpdateEmployeeModal> = ({
  showUpdateAndDeleteButtons,
  moderationSetter,
}) => {
  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      moderationSetter(1);
    } else if (option.value === 'non-executive') {
      moderationSetter(0);
    }
  };

  return (
    <ModifyModerationForm>
      {!showUpdateAndDeleteButtons && (
        <select
          name="status"
          id="registration_status"
          required
          onChange={(e: SyntheticEvent) =>
            checkAndUpdateModeration(e.currentTarget as HTMLSelectElement)
          }
        >
          <option value="choose-status">Votre statut</option>
          <option value="executive">Cadre</option>
          <option value="non-executive">Non-cadre</option>
        </select>
      )}
    </ModifyModerationForm>
  );
};

export default UpdateEmployeeModal;
