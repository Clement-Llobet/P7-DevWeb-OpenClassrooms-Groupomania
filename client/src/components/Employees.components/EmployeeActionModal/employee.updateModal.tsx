import React, { SyntheticEvent, useEffect, useState } from 'react';
import { EmployeesData } from '../../../interfaces';
import { ModifyModerationForm } from './employeeModalStyle';

interface IUpdateEmployeeModal {
  employee: EmployeesData;
  showUpdateAndDeleteButtons: boolean;
  setShowUpdateAndDeleteButtons: any;
}

const UpdateEmployeeModal: React.FC<IUpdateEmployeeModal> = ({
  employee,
  showUpdateAndDeleteButtons,
}) => {
  const [moderation, setModeration] = useState<number | null>(null);

  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setModeration(1);
    } else if (option.value === 'non-executive') {
      setModeration(0);
    } else {
    }
  };

  useEffect(() => {
    employee.moderation = moderation;
  }, [moderation, employee]);

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
