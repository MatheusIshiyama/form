import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Asterisk, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { Step } from '@/types/step';
import { mockSteps } from '@/mocks/steps';

type FormData = {
  name: string;
  email: string;
  age: string;
  occupation: string;
  interests: string[];
};

type FormPageProps = {
  form: {
    steps: Step[];
    data: FormData;
  };
};

export const getServerSideProps = (async () => {
  const props: FormPageProps = {
    form: {
      steps: mockSteps,
      data: {
        name: '',
        email: '',
        age: '',
        occupation: '',
        interests: [],
      },
    },
  };

  return { props };
}) satisfies GetServerSideProps<FormPageProps>;

export default function FormPage({ form }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState<FormData>(form.data);
  const [steps, setSteps] = useState<Step[]>(form.steps);
  const [currentStep, setCurrentStep] = useState<Step>(form.steps[0]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSelectCheckboxChange = (inputKey: string, value: string) => {
    setFormData((previous) => ({ ...previous, [inputKey]: value }));
  };

  const handleCheckboxChange = (input: string, value: string | number) => {
    setFormData((previous) => ({
      ...previous,
      [input]: previous[input].includes(value)
        ? previous[input].filter((previousInput) => previousInput !== value)
        : [...previous[input], value],
    }));
  };

  const handleNext = () => {
    if (currentStep.order - 1 < steps.length) setCurrentStep(steps.find((step) => step.order === currentStep.order + 1));
  };

  const handlePrevious = () => {
    if (currentStep.order > 1) setCurrentStep(steps.find((step) => step.order === currentStep.order - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep.order - 1].title}</h2>
            <span className="text-sm text-gray-500">
              Step {currentStep.order} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(currentStep.order / steps.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep.order / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
          {currentStep.inputs.map((input, index) => (
            <div key={index}>
              <Label className="flex items-center capitalize">
                {input.customTitle || input.key}
                {input.required && <Asterisk className="mr-2 h-3 w-3 text-red-600" />}
              </Label>

              {input.type === 'text' && (
                <Input
                  id={input.key}
                  name={input.key}
                  value={formData[input.key]}
                  type={input.format}
                  onChange={handleInputChange}
                  required={input.required}
                />
              )}

              {input.type === 'select-checkbox' && (
                <RadioGroup
                  className="mt-2"
                  value={formData[input.key]}
                  onValueChange={(value) => handleSelectCheckboxChange(input.key, value)}
                  required
                >
                  {input.selectOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label className="capitalize">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {input.type === 'checkbox' && (
                <div className="space-y-2">
                  {input.checkboxOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={option}
                        checked={formData[input.key].includes(option)}
                        onCheckedChange={() => handleCheckboxChange(input.key, option)}
                      />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button type="button" onClick={handlePrevious} disabled={currentStep.order === 1} variant="outline">
            {currentStep.order !== 1 && (
              <>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </>
            )}
          </Button>
          {currentStep.order < steps.length ? (
            <Button type="button" onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
