import { Step } from '@/types/step';

export const mockSteps: Step[] = [
  {
    order: 1,
    title: 'Personal Info',
    inputs: [
      {
        key: 'name',
        type: 'text',
        format: 'text',
        required: false,
      },
      {
        key: 'email',
        type: 'text',
        format: 'email',
        required: false,
      },
    ],
  },
  {
    order: 2,
    title: 'Professional Info',
    inputs: [
      {
        key: 'age',
        type: 'text',
        format: 'number',
        required: false,
      },
      {
        key: 'ocuppation',
        type: 'select-checkbox',
        selectOptions: ['student', 'employed', 'unemployed'],
        required: false,
      },
    ],
  },
  {
    order: 3,
    title: 'Interests',
    inputs: [
      {
        key: 'interests',
        customTitle: 'select all that apply',
        type: 'checkbox',
        checkboxOptions: ['technology', 'sports', 'art', 'travel'],
        required: false,
      },
    ],
  },
];
